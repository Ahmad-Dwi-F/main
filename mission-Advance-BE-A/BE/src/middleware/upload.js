import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";
import { HttpError } from "../utils/httpError.js";

export const UPLOAD_DIR = fileURLToPath(
  new URL("../../uploads", import.meta.url),
);
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
const EXTENSIONS = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const SIGNATURES = {
  ".jpg": (head) => head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff,
  ".png": (head) =>
    head
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  ".webp": (head) =>
    head.subarray(0, 4).toString("ascii") === "RIFF" &&
    head.subarray(8, 12).toString("ascii") === "WEBP",
};

const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,

    filename: (req, file, cb) =>
      cb(
        null,
        `u${req.userId}-${crypto.randomUUID()}${EXTENSIONS[file.mimetype]}`,
      ),
  }),
  limits: { fileSize: MAX_SIZE, files: 1 },
  fileFilter: (req, file, cb) => {
    if (EXTENSIONS[file.mimetype]) cb(null, true);
    else cb(new HttpError(400, "Format gambar harus JPG, PNG, atau WEBP."));
  },
});

export function uploadImage(req, res, next) {
  upload.single("image")(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      const message =
        error.code === "LIMIT_FILE_SIZE"
          ? "Ukuran gambar maksimal 2 MB."
          : "Unggahan gambar tidak valid.";
      return next(new HttpError(400, message));
    }
    if (error) return next(error);
    if (!req.file) {
      return next(
        new HttpError(400, "File gambar wajib diunggah (field: image)."),
      );
    }

    try {
      const head = Buffer.alloc(12);
      const handle = await fs.promises.open(req.file.path, "r");
      await handle.read(head, 0, 12, 0);
      await handle.close();

      const extension = path.extname(req.file.filename);
      if (!SIGNATURES[extension](head)) {
        await fs.promises.unlink(req.file.path);
        return next(new HttpError(400, "Isi file bukan gambar yang valid."));
      }
    } catch (err) {
      return next(err);
    }
    next();
  });
}
