    // login 

 exports.getLoginPage = async (req, res) => {
    
    const logins  = await query( 'SELECT Nom,Prenom,Mail,motDePasse FROM utilisateur')
    console.log('logins :', logins)
    try {
      res.render('authentification/login', { 
          logins : logins
          
      });
    } catch (e) {
      res.send(e)
    }
  };