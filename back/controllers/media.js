const { SQL } = require("../SQL") ;
//
//
//
//
exports.add_photo = (req, res, next) => {
  const insert = "INSERT INTO image (`image`,`title`,`likes`,`date`,`id_user`) VALUES";
  
  const values = req.files['photo'].map(file => {

    const name = file.originalname.replace(/_/g, ' ').replace(/\.[^/.]+$/, '');

    const urlImg = `${req.protocol}://${req.get("host")}/assets/photo/${req.auth.userId}/${file.filename}`;

    const currentDate = new Date().toISOString().split('T')[0];
    
    return `('${urlImg}', '${name}', 0, '${currentDate}', ${req.auth.userId})`;
  }).join(', ');
  
    SQL.query(insert + values, (err, data) => {
      if (err) return res.status(500).json("err");
      if (data.affectedRows > 0) return res.json("Mise à Jour");
      return res.status(403).json("Vous ne pouvez modifier que votre profil");
   });
  };
//
//
//
exports.photo_id = (req, res, next) => {
  const select = "SELECT * FROM image WHERE id_user = ?";

  SQL.query(select, [req.params.id], (err, data) =>{
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
};
