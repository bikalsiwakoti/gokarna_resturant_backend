const multer = require('multer'); 

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req,file,cb){
      cb(null, "src/public")
    },
    filename: function(req,file,cb){
      // console.log(file)
      cb(null,Date.now() +file.originalname)
    }
  })
}).single("img")

module.exports = upload;