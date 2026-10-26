const upload = require('../config/multer');

module.exports = {
  uploadSingleSpec: upload.single('spec')
};
