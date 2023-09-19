const connection = require('../db/connexion')
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const saltRounds = 8;

  const resgisterController = async (req, res) => {
    const {username, password} = req.body
    if(!username || !password) return sendStatus(401)
    
    connection.query(`SELECT username FROM users WHERE username = ?`, [username],async (error, result) =>{
        if(error) console.log(error)

        if(result.length !== 0) {
           return res.json({'error' : "Le username est déjà pris"})
        }
        // creapt password
        const passwordCrypt = await bcrypt.hash(password, saltRounds)

        connection.query(`INSERT INTO users (username, password) VALUES (?,?)`, [username, passwordCrypt], (error, result)=>{
            if(error) console.log(error)
            res.json({'registed' : true})
        })
    })
}

module.exports = {
    resgisterController
}