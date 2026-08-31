import JSZip from "jszip";
import { ImageItem } from "./types";

/**
 * Get proper file extension for a mime type
 */
function getExtensionForMime(mimeType: string, defaultExt: string): string {
  switch (mimeType) {
    case "image/webp":
      return ".webp";
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/avif":
      return ".avif";
    case "image/bmp":
      return ".bmp";
    case "image/x-icon":
      return ".ico";
    default:
      return defaultExt;
  }
}

/**
 * Bundle all compressed images into a single ZIP Blob
 */
export async function createBatchZip(
  items: ImageItem[],
  zipFilename = "compressed_images.zip"
): Promise<Blob> {
  const zip = new JSZip();
  const folderName = zipFilename.replace(/\.zip$/i, "");
  const folder = zip.folder(folderName) || zip;

  for (const item of items) {
    if (item.compressedBlob && item.status === "done") {
      const baseNameWithoutExt = item.originalName.replace(/\.[^/.]+$/, "");
      const mimeType = item.compressedBlob.type || "image/jpeg";
      const ext = getExtensionForMime(
        mimeType,
        item.originalName.substring(item.originalName.lastIndexOf("."))
      );
      const filename = `${baseNameWithoutExt}_compressed${ext}`;

      folder.file(filename, item.compressedBlob);
    }
  }

  return await zip.generateAsync({ type: "blob" });
}

/**
 * Trigger direct download of a Blob file in the browser
 */
export function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
