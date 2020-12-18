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
    const {email, password} = req.body;

    // Si l'email n'existe pas
    const findEmail = await querySql('SELECT COUNT(*) AS cnt FROM utilisateur WHERE Mail = ?', email)
    if (!findEmail[0].cnt > 0) return res.status(400).json({message: "Il n'y a pas d'utilisateur avec cet email"})

     // Vérifier le mot de passe
     const user = await querySql('SELECT UtilisateurId, Mail, motDePasse FROM utilisateur WHERE Mail = ?', email)
     console.log('user', user)
     await bcrypt.compare(password, user[0].motDePasse, (res, success) => {
         console.log('success', success)
         if (success) {
             console.log('Mot de passe correcte !')
         } else {
             console.log('Mot de passe incorrect')
         }
     })
};
