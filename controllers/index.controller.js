// GET('/')
exports.getIndexPage = async (req, res) => {
  const message = "Page d'accueil" 
  const user = req.session.user
  try {
    res.render('index', {
     message, user
    });
  } catch (e) {
    res.send(e)
  }
};