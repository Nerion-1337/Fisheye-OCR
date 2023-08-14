const { SQL } = require("../SQL") ;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
//
//
//
//
exports.register = async (req, res, next) => {
  const select = "SELECT * FROM users WHERE name = ?";
  const insert =  "INSERT INTO users (`name`,`password`) VALUE (?)";

  if(req.body.name.length > 5 && req.body.password.length > 5){

  SQL.query(select, [req.body.name.trim()], (err, data)=>{
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("L'utilisateur existe déjà!");
  

  const cryptage = bcrypt.hashSync(req.body.password, 10);  
  const values = [req.body.name, cryptage];


  SQL.query(insert, [values], (err, data) =>{
    if (err) return res.status(500).json(err);
    return res.status(200).json("Utilisateur créé.");
   });
 });

} else{
  return res.status(405).json("Taille du nom ou password insuffisant !");
}
};
//
//
//
exports.login = (req, res, next) => {
  const select = "SELECT * FROM users WHERE name = ?";

  SQL.query(select, [req.body.name], (err, data)=>{
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("L'utilisateur n'existe pas");

    const decryptage = bcrypt.compareSync(req.body.password, data[0].password);

    if(!decryptage) return res.status(400).json("Mauvais password");

    const token = jwt.sign({ id: data[0].id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });

    return res.status(200).json(token);

 });
};
//
//
//
exports.update_user = (req, res, next) => {
  const update = "UPDATE users SET `name`=?, `password`=? WHERE id=?";

  if(req.body.name.length > 5 && req.body.password.length > 5){

  const cryptage = bcrypt.hashSync(req.body.password, 10); 

  SQL.query(update, [req.body.name.trim(), cryptage, req.auth.userId], (err, data)=>{
    if (err) return res.status(500).json(err);
    if (data.affectedRows > 0) return res.json("Mise à Jour");
    return res.status(403).json("Vous ne pouvez modifier que votre profil");
 });
} else{
  return res.status(405).json("Taille du nom ou password insuffisant !");
}
};