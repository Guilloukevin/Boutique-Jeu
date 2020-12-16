exports.getListeJeuxPage = async (req, res) => {
    
    const jeux  = await query( 'SELECT Titre, JeuId, Prix, editeurId FROM jeu')
    console.log('jeux :', jeux)
    try {
      res.render('Jeux/listeJeux', { 
          consoles : jeux
      });
    } catch (e) {
      res.send(e)
    }
  };