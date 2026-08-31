/**
 * Loose / Smart JSON Parser
 * Supports standard JSON, Firestore / Firebase console dumps, and Chrome DevTools object dumps.
 */

export interface LooseParseResult {
  success: boolean;
  data?: unknown;
  formatDetected?: "json" | "firestore_dump" | "devtools_dump";
  error?: string;
}

export function parseSmartJson(input: string): LooseParseResult {
  const trimmed = input.trim();
  if (!trimmed) return { success: false, error: "Empty input" };

  // 1. Standard JSON Parse
  try {
    const data = JSON.parse(trimmed);
    return { success: true, data, formatDetected: "json" };
  } catch {
    // Continue to smart formats
  }

  // 2. Firestore / Firebase Dump Format Check
  if (isFirestoreDump(trimmed)) {
    try {
      const data = parseFirestoreDump(trimmed);
      return { success: true, data, formatDetected: "firestore_dump" };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to parse Firestore dump";
      return { success: false, error: msg };
    }
  }

  // 3. DevTools / JS Object Dump Format Check
  try {
    const data = parseDevToolsDump(trimmed);
    return { success: true, data, formatDetected: "devtools_dump" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to parse DevTools dump";
    return { success: false, error: msg };
  }
}

/**
 * Firestore / Firebase Console Dump Detection
 */
function isFirestoreDump(text: string): boolean {
  return (
    text.includes("(map)") ||
    text.includes("(string)") ||
    text.includes("(boolean)") ||
    text.includes("(int64)") ||
    text.includes("(timestamp)") ||
    text.includes("(null)") ||
    text.includes("(double)") ||
    text.includes("(array)")
  );
}

/**
 * Firestore / Firebase Dump Parser
 */
export function parseFirestoreDump(text: string): Record<string, unknown> {
  const rawLines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const root: Record<string, unknown> = {};
  const stack: { key: string; obj: Record<string, unknown> }[] = [{ key: "root", obj: root }];

  let i = 0;
  while (i < rawLines.length) {
    const currentLine = rawLines[i];
    const nextLine = rawLines[i + 1];

    if (nextLine === "(map)") {
      const newObj: Record<string, unknown> = {};
      const parentObj = stack[stack.length - 1].obj;
      parentObj[currentLine] = newObj;
      stack.push({ key: currentLine, obj: newObj });
      i += 2;
      continue;
    }

    const thirdLine = rawLines[i + 2];
    if (thirdLine && thirdLine.startsWith("(") && thirdLine.endsWith(")")) {
      const key = currentLine;
      const rawVal = nextLine;
      const typeTag = thirdLine.slice(1, -1);

      const val = parseFirestoreValue(rawVal, typeTag);
      const parentObj = stack[stack.length - 1].obj;
      parentObj[key] = val;

      i += 3;
      continue;
    }

    if (nextLine && nextLine.startsWith("(") && nextLine.endsWith(")")) {
      const key = currentLine;
      const typeTag = nextLine.slice(1, -1);
      const val = parseFirestoreValue("", typeTag);
      const parentObj = stack[stack.length - 1].obj;
      parentObj[key] = val;

      i += 2;
      continue;
    }

    i++;
  }

  return root;
}

function parseFirestoreValue(valStr: string, typeTag: string): unknown {
  const cleanVal = valStr.replace(/^"(.*)"$/, "$1");

  switch (typeTag.toLowerCase()) {
    case "string":
      return cleanVal;
    case "int64":
    case "int32":
    case "int":
    case "number":
    case "double":
      return Number(cleanVal);
    case "boolean":
    case "bool":
      return cleanVal.toLowerCase() === "true";
    case "null":
      return null;
    case "timestamp":
      return cleanVal || new Date().toISOString();
    default:
      return cleanVal;
  }
}

/**
 * Chrome DevTools / JS Object Inspection Parser
 */
export function parseDevToolsDump(text: string): unknown {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const resultObj: Record<string, unknown> = {};
  let i = 0;

  // Skip leading array index line if present (e.g. line 0 = "0", line 1 = ":")
  if (lines[0] && /^\d+$/.test(lines[0]) && lines[1] === ":") {
    i = 2;
    // Skip summary preview line if present (e.g. {id: "...",…})
    if (lines[i] && lines[i].startsWith("{") && (lines[i].endsWith("…}") || lines[i].endsWith("...}"))) {
      i++;
    }
  }

  while (i < lines.length) {
    const keyCandidate = lines[i];
    const colonCandidate = lines[i + 1];

    if (colonCandidate === ":" || keyCandidate.endsWith(":")) {
      const key = keyCandidate.replace(/:$/, "").trim();
      const valueLine = colonCandidate === ":" ? lines[i + 2] : lines[i + 1];
      const step = colonCandidate === ":" ? 3 : 2;

      if (valueLine) {
        const cleanValStr = valueLine
          .replace(/,\s*[…\.]+\s*([}\]])/g, "$1")
          .replace(/[…\.]+\s*([}\]])/g, "$1");

        resultObj[key] = parseJsValue(cleanValStr);
      }
      i += step;
      continue;
    }

    i++;
  }

  if (Object.keys(resultObj).length > 0) {
    return resultObj;
  }

  return parseDevToolsFallback(text);
}

function parseJsValue(str: string): unknown {
  const trimmed = str.trim();
  if (trimmed === "null" || trimmed === "undefined") return null;
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (!isNaN(Number(trimmed)) && trimmed !== "") return Number(trimmed);

  try {
    return JSON.parse(trimmed);
  } catch {
    try {
      const fixedKeys = trimmed.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');
      return JSON.parse(fixedKeys);
    } catch {
      try {
        return safeEvalJsObject(trimmed);
      } catch {
        return trimmed.replace(/^"(.*)"$/, "$1");
      }
    }
  }
}

function parseDevToolsFallback(text: string): unknown {
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^\d+\s*:\s*/, "");
  cleaned = cleaned.replace(/([a-zA-Z0-9_$]+)\s*\n+\s*:\s*\n*/g, "$1: ");
  cleaned = cleaned.replace(/,\s*[…\.]+\s*([}\]])/g, "$1");
  cleaned = cleaned.replace(/[…\.]+\s*([}\]])/g, "$1");
  cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');
  cleaned = cleaned.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"');
  cleaned = cleaned.replace(/:\s*undefined\b/g, ": null");

  try {
    return JSON.parse(cleaned);
  } catch {
    return safeEvalJsObject(cleaned);
  }
}

function safeEvalJsObject(code: string): unknown {
  if (/function|import|export|eval|process|window|document|global/i.test(code)) {
    throw new Error("Potentially unsafe code tokens detected in input");
  }

  const fn = new Function(`return (${code});`);
  return fn();
}
