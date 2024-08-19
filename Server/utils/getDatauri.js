/**
 * Multer: Used for handling file uploads.
DatauriParser: Converts the file buffer into a Data URI string.
Data URI: This format can then be used directly in HTML/CSS or sent to a cloud storage service.
 */

const DatauriParser = require("datauri/parser");
const path = require("path");
const parser = new DatauriParser();

const getDataUriParser = (file) => {
  const extName = path.extname(file.originalName).toString();
  console.log(extName);
  return parser.format(extName, file.buffer);
};

module.exports = getDataUriParser;
