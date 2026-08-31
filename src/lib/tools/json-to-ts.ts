export interface TsGeneratorOptions {
  style: "interface" | "type";
  exportTypes: boolean;
  optionalProps: boolean;
  readonlyProps: boolean;
  generateNested: boolean;
  rootName: string;
}

export const DEFAULT_TS_OPTIONS: TsGeneratorOptions = {
  style: "interface",
  exportTypes: true,
  optionalProps: false,
  readonlyProps: false,
  generateNested: true,
  rootName: "Root",
};

/**
 * Normalized Internal AST Nodes
 */
export type TypeAst =
  | { kind: "primitive"; value: "string" | "number" | "boolean" | "null" | "unknown" }
  | { kind: "union"; types: TypeAst[] }
  | { kind: "array"; elementType: TypeAst }
  | { kind: "object"; name: string; properties: { key: string; type: TypeAst; optional?: boolean }[] };

import { parseSmartJson } from "./loose-json-parser";

/**
 * Main Entry: Converts raw JSON string, Firestore dump, DevTools dump, or JS object to TypeScript definition code
 */
export function jsonToTypeScript(jsonInput: unknown, options?: Partial<TsGeneratorOptions>): string {
  const opts: TsGeneratorOptions = { ...DEFAULT_TS_OPTIONS, ...options };
  const rootName = sanitizeTypeName(opts.rootName || "Root");

  let parsed: unknown;
  if (typeof jsonInput === "string") {
    if (!jsonInput.trim()) return "";
    const smart = parseSmartJson(jsonInput);
    if (smart.success) {
      parsed = smart.data;
    } else {
      parsed = JSON.parse(jsonInput);
    }
  } else {
    parsed = jsonInput;
  }

  const interfaceMap = new Map<string, { key: string; type: TypeAst; optional?: boolean }[]>();
  const rootAst = inferTypeAst(parsed, rootName, interfaceMap, opts);

  if (opts.generateNested && interfaceMap.size > 0) {
    const definitions: string[] = [];

    // Generate root interface/type first if it's an object
    if (rootAst.kind === "object") {
      definitions.push(renderObjectDefinition(rootName, interfaceMap.get(rootName) || [], opts));
    } else {
      definitions.push(renderTypeAlias(rootName, renderTypeAstString(rootAst, opts), opts));
    }

    // Generate nested interfaces/types
    for (const [name, props] of interfaceMap.entries()) {
      if (name !== rootName) {
        definitions.push(renderObjectDefinition(name, props, opts));
      }
    }

    return definitions.join("\n\n");
  } else {
    // Single type or non-nested mode
    const rendered = renderTypeAstString(rootAst, opts);
    if (opts.style === "interface" && rootAst.kind === "object") {
      return renderObjectDefinition(rootName, rootAst.properties, opts);
    }
    return renderTypeAlias(rootName, rendered, opts);
  }
}

/**
 * Type Inference Engine
 */
function inferTypeAst(
  value: unknown,
  typeName: string,
  interfaceMap: Map<string, { key: string; type: TypeAst; optional?: boolean }[]>,
  opts: TsGeneratorOptions
): TypeAst {
  if (value === null) {
    return { kind: "primitive", value: "null" };
  }

  if (typeof value === "string") return { kind: "primitive", value: "string" };
  if (typeof value === "number") return { kind: "primitive", value: "number" };
  if (typeof value === "boolean") return { kind: "primitive", value: "boolean" };

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return { kind: "array", elementType: { kind: "primitive", value: "unknown" } };
    }

    // Infer element types from array
    const elementTypes = value.map((item) =>
      inferTypeAst(item, singularize(typeName) || `${typeName}Item`, interfaceMap, opts)
    );

    // Merge array element types
    const mergedElement = mergeArrayElementTypes(elementTypes, singularize(typeName), interfaceMap, opts);
    return { kind: "array", elementType: mergedElement };
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);
    const properties: { key: string; type: TypeAst; optional?: boolean }[] = [];

    for (const key of keys) {
      const childVal = obj[key];
      const childTypeName = sanitizeTypeName(key);
      const propType = inferTypeAst(childVal, childTypeName, interfaceMap, opts);
      properties.push({
        key,
        type: propType,
        optional: opts.optionalProps,
      });
    }

    if (opts.generateNested) {
      interfaceMap.set(typeName, properties);
    }

    return { kind: "object", name: typeName, properties };
  }

  return { kind: "primitive", value: "unknown" };
}

/**
 * Merges types in arrays (e.g. array of objects with different keys, or primitive unions like string | number)
 */
function mergeArrayElementTypes(
  types: TypeAst[],
  suggestedName: string,
  interfaceMap: Map<string, { key: string; type: TypeAst; optional?: boolean }[]>,
  opts: TsGeneratorOptions
): TypeAst {
  if (types.length === 0) return { kind: "primitive", value: "unknown" };

  const objectTypes = types.filter((t): t is Extract<TypeAst, { kind: "object" }> => t.kind === "object");

  if (objectTypes.length > 0 && objectTypes.length === types.length) {
    // Merge object properties across array items
    const mergedPropsMap = new Map<string, { key: string; type: TypeAst; count: number }>();
    const totalObjects = objectTypes.length;

    for (const obj of objectTypes) {
      for (const prop of obj.properties) {
        const existing = mergedPropsMap.get(prop.key);
        if (existing) {
          existing.count += 1;
          existing.type = combineTypes(existing.type, prop.type);
        } else {
          mergedPropsMap.set(prop.key, { key: prop.key, type: prop.type, count: 1 });
        }
      }
    }

    const mergedProperties = Array.from(mergedPropsMap.values()).map((item) => ({
      key: item.key,
      type: item.type,
      optional: opts.optionalProps || item.count < totalObjects,
    }));

    const finalName = sanitizeTypeName(suggestedName || "Item");
    if (opts.generateNested) {
      interfaceMap.set(finalName, mergedProperties);
    }

    return { kind: "object", name: finalName, properties: mergedProperties };
  }

  // Combine primitive / mixed types into union
  const uniqueKindMap = new Map<string, TypeAst>();
  for (const t of types) {
    const key = renderTypeAstString(t, opts);
    uniqueKindMap.set(key, t);
  }

  const uniqueList = Array.from(uniqueKindMap.values());
  if (uniqueList.length === 1) return uniqueList[0];

  return { kind: "union", types: uniqueList };
}

/**
 * Combines two AST types (e.g. string and null -> string | null)
 */
function combineTypes(a: TypeAst, b: TypeAst): TypeAst {
  const strA = JSON.stringify(a);
  const strB = JSON.stringify(b);
  if (strA === strB) return a;

  if (a.kind === "primitive" && a.value === "null" && b.kind === "primitive" && b.value !== "null") {
    return { kind: "union", types: [b, a] };
  }
  if (b.kind === "primitive" && b.value === "null" && a.kind === "primitive" && a.value !== "null") {
    return { kind: "union", types: [a, b] };
  }

  return { kind: "union", types: [a, b] };
}

/**
 * AST to TypeScript string formatter
 */
function renderTypeAstString(ast: TypeAst, opts: TsGeneratorOptions): string {
  switch (ast.kind) {
    case "primitive":
      return ast.value;
    case "union": {
      const typeStrs = ast.types.map((t) => renderTypeAstString(t, opts));
      return typeStrs.join(" | ");
    }
    case "array": {
      const elemStr = renderTypeAstString(ast.elementType, opts);
      if (ast.elementType.kind === "union") {
        return `(${elemStr})[]`;
      }
      return `${elemStr}[]`;
    }
    case "object":
      return opts.generateNested ? ast.name : renderInlineObject(ast.properties, opts);
  }
}

function renderInlineObject(
  properties: { key: string; type: TypeAst; optional?: boolean }[],
  opts: TsGeneratorOptions
): string {
  if (properties.length === 0) return "Record<string, unknown>";
  const lines = properties.map((p) => {
    const readonly = opts.readonlyProps ? "readonly " : "";
    const optMark = p.optional ? "?" : "";
    return `${readonly}${formatKey(p.key)}${optMark}: ${renderTypeAstString(p.type, opts)};`;
  });
  return `{ ${lines.join(" ")} }`;
}

function renderObjectDefinition(
  typeName: string,
  properties: { key: string; type: TypeAst; optional?: boolean }[],
  opts: TsGeneratorOptions
): string {
  const exportPrefix = opts.exportTypes ? "export " : "";
  const name = sanitizeTypeName(typeName);
  const readonly = opts.readonlyProps ? "readonly " : "";

  const lines = properties.map((p) => {
    const optMark = p.optional ? "?" : "";
    const valType = renderTypeAstString(p.type, opts);
    return `  ${readonly}${formatKey(p.key)}${optMark}: ${valType};`;
  });

  if (opts.style === "interface") {
    return `${exportPrefix}interface ${name} {\n${lines.join("\n")}\n}`;
  } else {
    return `${exportPrefix}type ${name} = {\n${lines.join("\n")}\n};`;
  }
}

function renderTypeAlias(typeName: string, targetType: string, opts: TsGeneratorOptions): string {
  const exportPrefix = opts.exportTypes ? "export " : "";
  return `${exportPrefix}type ${sanitizeTypeName(typeName)} = ${targetType};`;
}

/**
 * Helpers
 */
function sanitizeTypeName(str: string): string {
  if (!str) return "Item";
  const cleaned = str.replace(/[^\w]/g, "");
  if (!cleaned) return "Item";
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function singularize(str: string): string {
  if (str.endsWith("ies")) return str.slice(0, -3) + "y";
  if (str.endsWith("s") && !str.endsWith("ss")) return str.slice(0, -1);
  return str;
}

function formatKey(key: string): string {
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) {
    return key;
  }
  return JSON.stringify(key);
}
