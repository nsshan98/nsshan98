import { CompressionSettings, OutputFormat } from "./types";
import { getExifOrientation, transformCanvasContextForOrientation } from "./exif-utils";

/**
 * Check client browser encoding capability for specific MIME types
 */
export async function checkFormatSupport(): Promise<Record<string, boolean>> {
  if (typeof window === "undefined") {
    return {
      "image/webp": true,
      "image/jpeg": true,
      "image/png": true,
      "image/avif": false,
      "image/bmp": true,
      "image/x-icon": true,
    };
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  const formats = [
    "image/webp",
    "image/jpeg",
    "image/png",
    "image/avif",
    "image/bmp",
    "image/x-icon",
  ];

  const results: Record<string, boolean> = {};

  for (const fmt of formats) {
    try {
      const dataUrl = canvas.toDataURL(fmt);
      results[fmt] = dataUrl.startsWith(`data:${fmt}`);
    } catch {
      results[fmt] = false;
    }
  }

  return results;
}

/**
 * Decode HEIC/HEIF or SVG or standard image file into an Image element or Canvas HTML element
 */
export async function prepareImageSource(
  file: File
): Promise<{ source: HTMLImageElement | HTMLCanvasElement; width: number; height: number }> {
  let fileToLoad = file;

  // Handle HEIC / HEIF format via heic2any
  const isHeic =
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif");

  if (isHeic) {
    try {
      const heic2any = (await import("heic2any")).default;
      const convertedBlob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.92,
      });

      const singleBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      fileToLoad = new File([singleBlob], file.name.replace(/\.heic$/i, ".jpg"), {
        type: "image/jpeg",
      });
    } catch (err) {
      console.warn("Failed to convert HEIC image with heic2any:", err);
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(fileToLoad);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        source: img,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image source: " + file.name));
    };

    img.src = url;
  });
}

/**
 * Compute target dimensions based on preset, custom inputs, and aspect ratio locking
 */
export function calculateDimensions(
  origW: number,
  origH: number,
  settings: CompressionSettings
): { targetWidth: number; targetHeight: number } {
  let targetW = origW;
  let targetH = origH;

  // Handle resolution presets
  if (settings.preset !== "original" && settings.preset !== "custom") {
    const presetWidth = parseInt(settings.preset, 10);
    if (!isNaN(presetWidth) && presetWidth > 0 && presetWidth < origW) {
      targetW = presetWidth;
      targetH = Math.round((origH * presetWidth) / origW);
    }
  } else if (settings.preset === "custom" || (settings.width && settings.width > 0)) {
    if (settings.width && settings.height) {
      targetW = settings.width;
      targetH = settings.height;
    } else if (settings.width && settings.maintainAspectRatio) {
      targetW = settings.width;
      targetH = Math.round((origH * settings.width) / origW);
    } else if (settings.height && settings.maintainAspectRatio) {
      targetH = settings.height;
      targetW = Math.round((origW * settings.height) / origH);
    } else if (settings.width) {
      targetW = settings.width;
    } else if (settings.height) {
      targetH = settings.height;
    }
  }

  return { targetWidth: Math.max(1, targetW), targetHeight: Math.max(1, targetH) };
}

/**
 * Determine actual output mime type with graceful fallback if browser unsupported
 */
export function resolveOutputMime(
  requestedFormat: OutputFormat,
  originalType: string,
  supportedMap: Record<string, boolean>
): string {
  if (requestedFormat === "original") {
    // If original format supported, keep it. Else fall back to image/jpeg or image/webp
    if (supportedMap[originalType]) {
      return originalType;
    }
    return supportedMap["image/webp"] ? "image/webp" : "image/jpeg";
  }

  if (supportedMap[requestedFormat]) {
    return requestedFormat;
  }

  // Graceful fallback order
  if (supportedMap["image/webp"]) return "image/webp";
  if (supportedMap["image/jpeg"]) return "image/jpeg";
  return "image/png";
}

/**
 * Canvas export to Blob wrapped in Promise
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error(`Failed to encode canvas to ${mimeType}`));
        }
      },
      mimeType,
      quality
    );
  });
}

/**
 * Core image processing & compression pipeline
 */
export async function compressSingleImage(
  file: File,
  settings: CompressionSettings,
  supportedMap: Record<string, boolean>
): Promise<{
  blob: Blob;
  width: number;
  height: number;
  mimeType: string;
}> {
  // 1. Prepare image element
  const { source, width: origW, height: origH } = await prepareImageSource(file);

  // 2. Parse EXIF orientation if JPEG & metadata removal requested
  let orientation = 1;
  if (file.type === "image/jpeg" || file.name.toLowerCase().endsWith(".jpg")) {
    try {
      const buffer = await file.slice(0, 128 * 1024).arrayBuffer();
      orientation = getExifOrientation(buffer);
    } catch {
      orientation = 1;
    }
  }

  // 3. Compute output dimensions
  const { targetWidth, targetHeight } = calculateDimensions(origW, origH, settings);

  // 4. Create offscreen canvas for rendering
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context creation failed");
  }

  // Handle EXIF rotation canvas dimensions swap if 90 or 270 deg
  const isRotated90 = orientation === 5 || orientation === 6 || orientation === 7 || orientation === 8;
  canvas.width = isRotated90 ? targetHeight : targetWidth;
  canvas.height = isRotated90 ? targetWidth : targetHeight;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Apply EXIF transform before drawing
  if (orientation > 1) {
    transformCanvasContextForOrientation(ctx, orientation, targetWidth, targetHeight);
  }

  ctx.drawImage(source, 0, 0, targetWidth, targetHeight);

  // 5. Determine target MIME type
  const targetMime = resolveOutputMime(settings.outputFormat, file.type, supportedMap);

  // 6. Handle "Compress to Target Size" (Iterative Binary Search)
  if (settings.targetSizeKb && settings.targetSizeKb > 0) {
    const targetSizeBytes = settings.targetSizeKb * 1024;
    let minQuality = 0.05;
    let maxQuality = 1.0;
    let bestBlob: Blob | null = null;

    // Iterative binary search up to 8 iterations
    for (let iter = 0; iter < 8; iter++) {
      const currentQuality = (minQuality + maxQuality) / 2;
      const testBlob = await canvasToBlob(canvas, targetMime, currentQuality);

      if (
        !bestBlob ||
        Math.abs(testBlob.size - targetSizeBytes) < Math.abs(bestBlob.size - targetSizeBytes)
      ) {
        bestBlob = testBlob;
      }

      if (Math.abs(testBlob.size - targetSizeBytes) / targetSizeBytes < 0.04) {
        // Within 4% accuracy of target size!
        break;
      }

      if (testBlob.size > targetSizeBytes) {
        maxQuality = currentQuality;
      } else {
        minQuality = currentQuality;
      }
    }

    // If even lowest quality is larger than target size, progressively scale down canvas resolution
    if (bestBlob && bestBlob.size > targetSizeBytes * 1.1) {
      let scale = 0.85;
      while (scale >= 0.3 && bestBlob && bestBlob.size > targetSizeBytes * 1.05) {
        const scaledW = Math.max(16, Math.round(targetWidth * scale));
        const scaledH = Math.max(16, Math.round(targetHeight * scale));

        const scaleCanvas = document.createElement("canvas");
        scaleCanvas.width = isRotated90 ? scaledH : scaledW;
        scaleCanvas.height = isRotated90 ? scaledW : scaledH;
        const scaleCtx = scaleCanvas.getContext("2d");

        if (scaleCtx) {
          scaleCtx.imageSmoothingEnabled = true;
          scaleCtx.imageSmoothingQuality = "high";
          if (orientation > 1) {
            transformCanvasContextForOrientation(scaleCtx, orientation, scaledW, scaledH);
          }
          scaleCtx.drawImage(source, 0, 0, scaledW, scaledH);

          const scaledBlob = await canvasToBlob(scaleCanvas, targetMime, 0.5);
          if (scaledBlob.size < bestBlob.size) {
            bestBlob = scaledBlob;
          }
        }
        scale -= 0.15;
      }
    }

    return {
      blob: bestBlob || (await canvasToBlob(canvas, targetMime, settings.quality / 100)),
      width: canvas.width,
      height: canvas.height,
      mimeType: targetMime,
    };
  }

  // 7. Standard quality compression
  const qualityParam = settings.quality / 100;
  const finalBlob = await canvasToBlob(canvas, targetMime, qualityParam);

  return {
    blob: finalBlob,
    width: canvas.width,
    height: canvas.height,
    mimeType: targetMime,
  };
}

/**
 * Format byte count into clean human readable string (e.g. 2.8 MB, 420 KB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
