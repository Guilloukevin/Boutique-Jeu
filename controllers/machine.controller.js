exports.getListeMachinePage = async (req, res) => {
    
  const machines  = await query( 'SELECT Nom, machineId FROM machine')
  try {
    res.render('machine/machines', { 
        consoles : machines
    });
  } catch (e) {
    res.send(e)
  }
};

// Methode GET : Afficher le formulaire
exports.getAjouteMachinePage = async (req, res) => {
  try {
  res.render('machine/ajouterMachine');
      } 
  catch (e) {
  res.send(e)
  }
};

// Methode POST : Ajouter une machine 
exports.postAjouteMachinePage = async (req, res) => {
  try {
      const name = req.body.nom
      // Hasher le mot de passe
      await query ("INSERT INTO machine (Nom) VALUES (?)", [name], (err, result) => {
        if(err) {
          res.status(400).json({message : err })
        }
        res.redirect("/machine/liste-machine")
      } )
    } catch (err) {
      res.status(400).json({message : err })
    }
}; 

