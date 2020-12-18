const bcrypt = require("bcrypt");

exports.getRegisterPage = async (req, res) => {
    res.render('authentification/register')
    // Envoie dans le dossier views
};

exports.postRegisterPage = async (req, res) => {
    // Middleware : body parser, Parser les données dans l'url
    const nom = req.body.nom
    const prenom = req.body.prenom
    const email = req.body.email
    const motdepasse = req.body.motdepasse
    const role = req.body.role

    // Si l'email existe    
    const emailExiste = await querySql ('SELECT Mail From utilisateur WHERE Mail = ?', [email])
    if (emailExiste.length > 0) {
        return res.send('Email existe deja ')
    }
    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const mot_de_passe_hasher = await bcrypt.hash(motdepasse, salt);
    // res.send(`Le mot de passe hasher est : ${mot_de_passe_hasher}`)

    try {
        // Ajouter l'utilisateur dans la base de donnée
        await querySql ('INSERT INTO utilisateur (Nom,Prenom,Mail,motDePasse,roleId) VALUES (?,?,?,?,? )', [nom,prenom,email,mot_de_passe_hasher,role], 
        (err, result) => {
            res.render('authentification/registerSuccess')
        } )
    } 
    catch (err) {
        res.json({ message: err })
      }
};

exports.getLoginPage = async (req, res) => {
    res.render('authentification/login')
};

exports.postLoginPage = async (req, res) => {
    // Middleware : body parser, Parser les données dans l'url
    const email = req.body.email
    const motdepasse = req.body.motdepasse
    
    // Verifier si l'email n'éxiste pas dans la base de donnée
   const findEmail =  await querySql('SELECT Mail FROM utilisateur WHERE Mail = ?',[email])
   console.log('findEmail', findEmail[0])
//    (err, result) => {
//         // console.log('result ', result)
//         if (result === undefined || result.length === 0) {
//             return res.send(`Pas d'utilisateur avec cet adresse mail ${email}`)
//         }
//     }

    if (findEmail[0] === undefined || findEmail[0].length === 0) {
        return res.send(`Pas d'utilisateur avec cet adresse mail ${email}`)
    }


try { 
    await querySql('SELECT Mail,motDePasse FROM utilisateur WHERE Mail = ?',[email], (err, result) =>{
         bcrypt.compare(motdepasse, result[0].motDePasse, async (err, success) => {
            if (err) {
                return res.status(401).json({
                    error: `Bcrypt Auth failed`
                });
            }
            if (success) {
                console.log('result', result[0].motDePasse)
              await querySql(
                  'SELECT UtilisateurId, Mail, motDePasse FROM utilisateur WHERE Mail = ? AND motDePasse = ?', 
                  [email, result[0].motdepasse], 
                  function(err, results) {
                      console.log('results', results)
              if (results.length) {
                      req.session.loggedin = true;
                      req.session.userId =  result[0].UtilisateurId;
                  //res.redirect('/dashboard');
                  res.send('Vous etes co')
                } else {
                  res.send('Email ou mot de passe incorrect !');
                }			
              });
            } else {
              res.send('Ajouter un email ou un mot de passe !');
            }
            })
    })
    
      } 
    catch (err) {
        res.json({ message: err })
      }
};
