const router = require("express").Router();
const authController = require("./controllers/auth");
const userController = require("./controllers/user");
const mediaController = require("./controllers/media");
const likeController = require("./controllers/like");
const jwt = require("./middleware/auth");
const multer = require("./middleware/multer");
// const password = require("./middleware/password");

//
// AUTH
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.put('/edit/update_user', jwt, authController.update_user);
//
// USER
router.get('/user/data_all', userController.data)
router.get('/user/data/:id', userController.data_id)
router.get('/user/data_user', jwt, userController.data_user)
router.put('/edit/update_avatar', jwt, multer, userController.update_avatar);
//
// IMAGE
router.post('/add_photo', jwt, multer, mediaController.add_photo);
router.get('/photo/:id', mediaController.photo_id)
//
// LIKE
router.post('/like', jwt, likeController.like, likeController.compte_like);
//
//
module.exports = router;
