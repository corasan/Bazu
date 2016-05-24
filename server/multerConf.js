var multer  = require('multer');

// Multer function to store uploaded images
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.jpeg`);
    }
});
module.exports = multer({ storage: storage });
