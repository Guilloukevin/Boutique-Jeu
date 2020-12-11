exports.getListeMachinePage = async (req, res) => {
    
  const machines  = await query( 'SELECT Nom, machineId FROM machine')
  console.log('machines :', machines)
  try {
    res.render('machine/machines', { 
        consoles : machines
        //machines : machines
    //  console : machines
    // categories
    });
  } catch (e) {
    res.send(e)
  }
};

exports.getAjouteMachinePage = async (req, res) => {
  try {
  res.render('machine/ajouterMachine');
      } 
  catch (e) {
  res.send(e)
  }
};

exports.postAjouteMachinePage = async (req, res) => {
  /* const name = req.body.nom;
  await query ("INSERT INTO machine (Nom) values ('"+name+"')"); */
  
  try {
      const name = req.body.nom
      // Hasher le mot de passe
      await query ("INSERT INTO machine (Nom) VALUES (?)", [name], (err, result) => {
        if(err) {
          res.status(400).json({message : err })
        }
        res.redirect("/jeux/liste-machine")
      } )
    } catch (err) {
      res.status(400).json({message : err })
    }
};