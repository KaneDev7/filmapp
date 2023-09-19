const connection = require('../db/connexion')
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken')

const authentification = (req, res) => {
    const { username, password } = req.body
    if(!username || !password) return sendStatus(401)

    connection.query(`SELECT * FROM users WHERE username = ?`, [username], async (error, result) => {
        if (error) console.log(error)

        if (result.length < 1) {
            return res.json({'error' : "incorrect username or password"})
        }
        const match = await bcrypt.compare(password, result[0].password)
        if(match){
            const validTimeToken = 60 * 60 * 20
            const accessToken = jsonwebtoken.sign(
                {"username": result[0].username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn :  validTimeToken + 's'}
            )

            const refreshToken = jsonwebtoken.sign(
                {"username": result[0].username},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn : '1d'}
            )

            connection.query('UPDATE users SET token = ? WHERE username = ?',[refreshToken, username],(err, succees) =>{
                if(err) console.log(err)
                res.cookie('jwt', refreshToken,{httpOnly : true, maxAge : 24 * 60 * 60 * 1000});
                return res.json({"isLogin" : true ,'token' : accessToken, username: result[0].username})
            })
        }else{
            return res.json({'error' : "incorrect username or password"})

        }
       
    })
}

module.exports = {
    authentification
}