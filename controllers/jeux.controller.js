
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
  
          await querySql ("UPDATE jeu set Titre=?,Prix=?,Pegi=?,Description=?,Annee=?,Quantite=?,editeurId=??) WHERE JeuId = ?", [name,prix,pegi,description,annee,quantite,editeur], (err, result) => {
            if(err) {
              res.status(400).json({message : err })
            }
            res.redirect("/jeux/liste-jeux")
          } )
        } catch (err) {
          res.status(400).json({message : err })
        }
    }; 

// delete book
exports.deleteSupprimerJeuxPage = async (req, res) => {

  let id = req.params.JeuId;
   
  dbConn.query('DELETE FROM jeu WHERE JeuId = ' + id, function(err, result) {
      //if(err) Renvoie l'erreur
      if (err) {
          // set flash message
          req.flash('error', err)
          // redirect to liste des jeux
          res.redirect('/liste-jeux')
      } else {
          // flash message
          req.flash('success', 'Jeu bien supprimer! ID = ' + id)
          // redirect à la liste des jeux
          res.redirect('/liste-jeux')
      }
  })
}