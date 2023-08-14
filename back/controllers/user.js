const { SQL } = require("../SQL") ;
const fs = require("fs");
//
//
//
//
exports.data = (req, res, next) =>{
  const select = "SELECT * FROM users";

  SQL.query(select, (err, data) =>{
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}
//
//
//
exports.data_id = (req, res, next) =>{
  const select = "SELECT * FROM users WHERE id = ?";

  SQL.query(select, [req.params.id], (err, data) =>{
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}
//
//
//
exports.data_user = (req, res, next) =>{
  const select = "SELECT * FROM users WHERE id = ?";

  SQL.query(select, [req.auth.userId], (err, data) =>{
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}
  //
  //
  //
  exports.update_avatar = (req, res, next) => {
    const update = "UPDATE users SET `portrait`=? WHERE id=?";
    const urlImg = `${req.protocol}://${req.get("host")}/assets/avatar/${req.files['avatar'][0].filename}`;
    const select = "SELECT portrait FROM users WHERE id = ?";
  
    SQL.query(select, [req.auth.userId], (err, data)=>{
      if (err) return res.status(500).json(err);
      
      if(data[0].avatar){
        const filename = data[0].avatar.split("/avatar/")[1];
        fs.unlink(`assets/avatar/${filename}`, () =>{})
      } 
  
    SQL.query(update, [urlImg, req.auth.userId], (err, data)=>{
      if (err) return res.status(500).json("err");
      if (data.affectedRows > 0) return res.json("Mise à Jour");
      return res.status(403).json("Vous ne pouvez modifier que votre profil");
   });
  });
  };