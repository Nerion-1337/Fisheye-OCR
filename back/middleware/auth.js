const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
       try {
        if(!req.headers.authorization) return res.status(401).json("Aucun Token");
           const token = req.headers.authorization.split(' ')[1];

           const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
           const userId = decodedToken.id;
           req.auth = {
               userId: userId
           };     
        return next();
       } catch(error) {
           res.status(401).json({ error });
       }
    };
