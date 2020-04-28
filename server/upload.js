const formidable = require("formidable");
const path = require('path');
const UPLOAD_FILES_DIR = path.resolve(__dirname, "../app/public/images") + "/";
const uuidv4 = require('uuid/v4');

module.exports = function upload(req, res) {
  var form = new formidable({ multiples: true, uploadDir: UPLOAD_FILES_DIR });

  form.on('fileBegin', function (name, file) {
    file.name = uuidv4() + "_" + file.name;
    file.path = UPLOAD_FILES_DIR + file.name;
  });

  form.on('file', function (name, file) {
    console.log('Uploaded ' + file.name);
  });

  form.parse(req, (err, fields, files) => {
    let uploadedFiles = files.files;
    if (files.files.__proto__ !== Array.prototype) {
      uploadedFiles = [uploadedFiles];
    }

    uploadedFiles.map(s => s.path = `images/${s.name}`);
    res.end(JSON.stringify(uploadedFiles));
  });

}

