
  const logOutController = async (req, res) => {

    res.clearCookie('jwt', { httpOnly: true });
    return res.json({"isLogin" : false ,'token' : '', username: ''})

}

module.exports = {
    logOutController
}