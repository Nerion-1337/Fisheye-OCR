const multer = require("multer");
const fs = require('fs');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
  };

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      if(file.fieldname === "avatar"){
        callback(null, `assets/${file.fieldname}`);
      } else {
        const folderPath = `assets/${file.fieldname}/${req.auth.userId}`;
        fs.access(folderPath, (err) =>{
          if(err){
            fs.mkdirSync(folderPath, { recursive: true });
          }
             callback(null, folderPath);
        })    
      }    
    },
    filename: (req, file, callback) => {
      const extension = MIME_TYPES[file.mimetype];  
      const name = file.originalname.split(' ').join('_').split(".");
      if (extension == undefined) {
        callback(new Error('Invalid MIME TYPES'));     
    } else {
        callback(null, name[0] + "." + extension);
    }
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 10000000 // 10Mo
    },
  }).fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'photo', maxCount: 10 } 
  ]);
  
  
  module.exports = (req, res, next) => {
    upload(req, res, (err) =>{
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: `Taille de l'image trop grande` }); 

      } else if (!req.files) {
        return res.status(400).json({ error: `Aucune image sélectionnée` });
    
      } else if (err){
        return res.status(400).json({ error: `Une erreur s'est produite` });
      }
      next();
    });
  };