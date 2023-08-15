const { SQL } = require("../SQL");
//
//
//
//
exports.like = async (req, res, next) => {
  const controle = "SELECT * FROM `image` WHERE id = ? AND id_user = ?";
  const select = "SELECT * FROM `likes` WHERE image_id = ? AND user_like_id = ?";
  const insert =
    "INSERT INTO `likes` (`image_id`,`user_like_id`,`user_image_id`) VALUE (?)";
  const delet = "DELETE FROM `likes` WHERE id = ?";
  //
  const user = req.auth.userId;
  const img = req.body.image_id;
  const user_img = req.body.user_image_id;
  //
  SQL.query(controle, [img, user_img], (err, datas) => {
    if (err) return res.status(500).json(err);
    if (datas.length == 0) return res.status(400).json("Erreur de saisi des données");
    if(datas.length > 0){
  SQL.query(select, [img, user], (err, datas) => {
    const infos = [img, user, user_img];
    if (err) return res.status(500).json(err);
    if (datas.length == 0) {
      SQL.query(insert, [infos], (err, data) => {
        if (err) return res.status(500).json(err);
        next();
        return res.status(200).json("Photo liker !");
      });
    } else if (datas[0].user_like_id == user) {
    SQL.query(delet, [datas[0].id], (err, data) => {
      if (err) return res.status(500).json(err);
      next();
      return res.status(200).json("Like supprimé !");
    });
    };
  });
  
}
});
};

exports.compte_like = async (req, res, next) => {
  const select = "SELECT COUNT(*) FROM `likes` WHERE image_id = ?";
  const update = "UPDATE image SET `likes` = ? WHERE id = ?";
  //
  const img = req.body.image_id;
  //
  SQL.query(select, [img], (err, datas) => {
    if (err) return res.status(500).json(err);

    SQL.query(update, [datas[0]['COUNT(*)'], img], (err, data) => {
      if (err) return res.status(500).json(err);
    });
  });
}
