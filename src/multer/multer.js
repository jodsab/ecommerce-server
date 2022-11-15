import multer from "multer";
import path from "path";

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./src/public/images");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

export default upload;
