const connection = require('../db/connexion')
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    
    if(!authHeader) return res.status(401)
    const token = authHeader.split(' ')[1]
   if(token){
    jsonwebtoken.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log('token ivalid')
                return res.status(401).json({'token' : 'ivalid'})
            }
            req.user = {isLogin : true ,token : token, username : decoded.username}  
            next()
        }
    )
   }else{
    return res.status(401)
   }
  

}

module.exports = { verifyToken }