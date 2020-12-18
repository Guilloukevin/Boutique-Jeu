// Methode GET liste des jeux
exports.getListeJeuxPage = async (req, res) => {
    
    const jeux  = await query( 'SELECT Titre, JeuId, Prix, editeurId FROM jeu')
    try {
      res.render('Jeux/listeJeux', { 
          consoles : jeux
      });
    } catch (e) {
      res.send(e)
    }
  };

  // Methode GET modification jeux
  exports.getAjouterJeuxPage = async (req, res) => {
    
    const jeux  = await query( 'SELECT Titre, JeuId, Prix, editeurId FROM jeu')
    try {
      res.render('Jeux/ajouterJeux', { 
          consoles : jeux
      });
    } catch (e) {
      res.send(e)
    }
  };

  // Methode POST modification jeux

  exports.postAjouterJeuxPage = async (req, res) => {
    try {
        const name = req.body.nom
        const prix = req.body.prix
        const pegi = req.body.pegi
        const description = req.body.description
        const annee = req.body.annee
        const quantite = req.body.quantite
        const editeur = req.body.editeur

        await query ("INSERT INTO jeu (Titre,Prix,Pegi,Description,Annee,Quantite,editeurId) VALUES (?,?,?,?,?,?,?)", [name,prix,pegi,description,annee,quantite,editeur], (err, result) => {
          if(err) {
            res.status(400).json({message : err })
          }
          res.redirect("/jeux/liste-jeux")
        } )
      } catch (err) {
        res.status(400).json({message : err })
      }
  }; 

  // Suppression jeux

  exports.getSupprimerJeuxPage = async (req, res) => {
      
      const supprimerJeux  = await query( 'SELECT Titre,JeuId FROM jeu')
      try {
        res.render('Jeux/supprimerJeux', { 
            consoles : supprimerJeux
        });
      } catch (e) {
        res.send(e)
      }
    };

