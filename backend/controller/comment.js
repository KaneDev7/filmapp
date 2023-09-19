const connection = require('../db/connexion')



  const postCommentController =  (req, res) => {
    const {username, comment, movieId} = req.body
    console.log(req.body)
    if(!username || !comment) return sendStatus(401)
    
    connection.query(`INSERT INTO comments (username, text, movieId) VALUES (?,?,?)`, [username, comment,movieId], (error, results)=>{
        if(error) console.log(error)
        res.json({'success': 'comment inserted'})
    })

}

const getCommentController = (req, res) => {
    const {movieId} = req.params
    console.log(movieId)
    connection.query(`SELECT * FROM comments WHERE movieId = ?`, [movieId], (error, results)=>{
        if(error) console.log(error)
        res.json({results})
    })

}

module.exports = {
    postCommentController,
    getCommentController
}