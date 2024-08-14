const multer = require("multer");
const path = require('path');




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName=file.originalname.split('.')[0];
    cb(null, fileName + uniqueSuffix + path.extname(file.originalname));
  },
});

// const fileFilter = (req, file, cb) => {
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     return cb(new Error("Only image files are allowed!"), false);
//   }
//   cb(null, true);
// };

const upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 },
});


module.exports = upload;