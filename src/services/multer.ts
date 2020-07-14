import multer from "multer";

const ALLOWED_FORMAT = ["image/jpeg", "image/png", "image/jpg"];
export const uploadImage = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (ALLOWED_FORMAT.includes(file.mimetype)) {
      cb(null, true);
    } else {
      // @ts-ignore
      cb(new Error("Invalid file format!"), false);
    }
  },
});
