const express = require('express')
const {authentification} = require('../controller/auth') 
const {resgisterController} = require('../controller/register') 
const { verifyToken } = require('../middleware/verifyToken')
const { refreshToken } = require('../controller/refreshToken')
const { logOutController } = require('../controller/logout')
const { postCommentController, getCommentController } = require('../controller/comment')


 const router = new express.Router()

 // auth route
 router.post('/register', resgisterController)
 router.post('/auth', authentification)
 router.get('/logout', logOutController)
 router.get('/refresh', refreshToken)
 router.post('/comment', postCommentController)
 router.get('/comment/:movieId', getCommentController)




 // protected rootes

 router.get('/private', verifyToken,(req, res) =>{
    res.json(req.user)
 } )





module.exports = router