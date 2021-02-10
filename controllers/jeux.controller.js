
// Methode GET liste des jeux
exports.getListeJeuxPage = async (req, res) => {
    
    const jeux  = await querySql( 'SELECT Titre, JeuId, Prix, editeurId FROM jeu')
    try {
      res.render('Jeux/listeJeux', { 
          consoles : jeux
      });
    } catch (e) {
      res.send(e)
    }
  };

  // Get by Id
  exports.getListeJeuxPageId = async (req, res) => {
    await querySql('SELECT * FROM jeu WHERE jeuId = ?', [req.params.id], (err, rows, fields) =>{
      if(!err)
      res.send(rows);
      else
      console.log(err)
    })
  };



  // Methode GET Ajout jeux
  exports.getAjouterJeuxPage = async (req, res) => {
    
    const jeux  = await querySql( 'SELECT Titre, JeuId, Prix, editeurId FROM jeu')
    try {
      res.render('Jeux/ajouterJeux', { 
          consoles : jeux
      });
    } catch (e) {
      res.send(e)
    }
  };

  // Methode POST Ajouter jeux

  exports.postAjouterJeuxPage = async (req, res) => {
    try {
        const name = req.body.nom
        const prix = req.body.prix
        const pegi = req.body.pegi
        const description = req.body.description
        const annee = req.body.annee
        const quantite = req.body.quantite
        const editeur = req.body.editeur

        await querySql ("INSERT INTO jeu (Titre,Prix,Pegi,Description,Annee,Quantite,editeurId) VALUES (?,?,?,?,?,?,?)", [name,prix,pegi,description,annee,quantite,editeur], (err, result) => {
          if(err) {
            res.status(400).json({message : err })
          }
          res.redirect("/jeux/liste-jeux")
        } )
      } catch (err) {
        res.status(400).json({message : err })
      }
  }; 


    // Modification des informations d'un jeu

    exports.getModifierJeuxPage = async (req, res) => {
      try {
      res.render('jeux/modifierJeux');
          } 
      catch (e) {
      res.send(e)
      }
    };

    exports.putModifierJeuxPage = async (req, res) => {
      try {
          const name = req.body.nom
          const prix = req.body.prix
          const pegi = req.body.pegi
          const description = req.body.description
          const annee = req.body.annee
          const quantite = req.body.quantite
          const editeur = req.body.editeur
  
          await querySql ("UPDATE jeu SET Titre=?,Prix=?,Pegi=?,Description=?,Annee=?,Quantite=?,editeurId=?) WHERE JeuId = ?", [name,prix,pegi,description,annee,quantite,editeur], (err, result) => {
            if(err) {
              res.status(400).json({message : err })
            }
            res.redirect("/jeux/modifier-jeux")
          } )
        } catch (err) {
          res.status(400).json({message : err })
        }
    }; 

// Supprimer un jeu
exports.deleteSupprimerJeuxPageId = async (req, res) => {
  const { id } = req.params;

  await querySql('DELETE FROM jeu WHERE JeuId = ?', [id], (err, rows, fields) =>{
    if(!err)
    res.send('Deleted !');
    else
    console.log(err);
  })
};

