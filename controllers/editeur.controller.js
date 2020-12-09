exports.getListeEditeurPage = async (req, res) => {
    
    const editeurs  = await query( 'SELECT nomEditeur, editeurId FROM editeur')
    // console.log('editeurs :', editeurs)
    try {
      res.render('editeurs', { 
          editeurs : editeurs
      });
    } catch (e) {
      res.send(e)
    }
  };