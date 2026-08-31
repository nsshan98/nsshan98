import { parseSmartJson } from "./loose-json-parser";

export interface JsonValidationError {
  message: string;
  line?: number;
  column?: number;
  snippet?: string;
}

export interface JsonValidationResult {
  isValid: boolean;
  formatDetected?: "json" | "firestore_dump" | "devtools_dump";
  parsedData?: unknown;
  error?: JsonValidationError;
}

export function validateJson(jsonString: string): JsonValidationResult {
  if (!jsonString.trim()) {
    return { isValid: true, formatDetected: "json" };
  }

  // 1. Try Smart Parser (handles standard JSON, Firestore dumps, and Chrome DevTools object dumps)
  const result = parseSmartJson(jsonString);

  if (result.success) {
    return {
      isValid: true,
      formatDetected: result.formatDetected,
      parsedData: result.data,
    };
  }

  // 2. If parsing failed, extract error location from standard JSON parse attempt
  try {
    JSON.parse(jsonString);
    return { isValid: true, formatDetected: "json" };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Invalid JSON format";

    let line: number | undefined;
    let column: number | undefined;

    const posMatch = /at position (\d+)/i.exec(errorMessage);
    const lineColMatch = /line (\d+) column (\d+)/i.exec(errorMessage);

    if (lineColMatch) {
      line = parseInt(lineColMatch[1], 10);
      column = parseInt(lineColMatch[2], 10);
    } else if (posMatch) {
      const position = parseInt(posMatch[1], 10);
      const lines = jsonString.slice(0, position).split("\n");
      line = lines.length;
      column = (lines[lines.length - 1]?.length || 0) + 1;
    }

    return {
      isValid: false,
      error: {
        message: result.error || errorMessage,
        line,
        column,
      },
    };
  }
}
