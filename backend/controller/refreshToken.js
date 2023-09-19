const connection = require('../db/connexion')
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken')


const refreshToken = (req, res, next) => {
    const refreshToken = req.cookies?.jwt
    connection.query('SELECT * FROM users WHERE token = ?', [refreshToken], (err, result) => {
        if (err) console.log(err)
        const { username, token } = result[0]

        if (token === refreshToken) {
            const validTimeToken = 60 * 60 * 20
            jsonwebtoken.verify(
                token,
                process.env.REFRESH_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) return res.status(401)

                    const accessToken = jsonwebtoken.sign(
                        { "username": username },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: validTimeToken + 's' }
                    )
                    console.log('success')
                    return res.json({"isLogin" : true ,'token' : accessToken, username})
                }
            )
        } else {
            return res.status(401)
        }

    })
    //     const authHeader = req.headers['authorization']
    //     console.log(authHeader)
    //     if(!authHeader) return res.status(401)
    //     const token = authHeader.split(' ')[1]
    //    if(token){
    //     jsonwebtoken.verify(
    //         token,
    //         process.env.ACCESS_TOKEN_SECRET,
    //         (err, decoded) => {
    //             if (err) {
    //                 console.log('token ivalid')
    //                 throw new Error('Ivalid token')
    //             }
    //             req.user = {isLogin : true ,token : token, username : decoded.us}  
    //             next()
    //         }
    //     )
    //    }else{
    //     return res.status(401)
    //    }


}

module.exports = { refreshToken }