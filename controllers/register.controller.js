exports.getRegisterPage = async (req, res) => {
    try {
    res.render('authentification/register');
        } 
    catch (e) {
    res.send(e)
    }
  };
  
  /* exports.postRegisterPage = async (req, res) => {
    try {
        const name = req.body.nom
        // Hasher le mot de passe
        await query ("INSERT INTO machine (Nom) VALUES (?)", [name], (err, result) => {
          if(err) {
            res.status(400).json({message : err })
          }
          res.redirect("/authentification/login")
        } )
      } catch (err) {
        res.status(400).json({message : err })
      }
  }; */