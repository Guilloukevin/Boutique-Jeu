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
    const emailExiste = await query ('SELECT Mail From utilisateur WHERE Mail = ?', [email])
    if (emailExiste.length > 0) {
        return res.send('Email existe deja ')
    }
    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const mot_de_passe_hasher = await bcrypt.hash(motdepasse, salt);
    // res.send(`Le mot de passe hasher est : ${mot_de_passe_hasher}`)

    try {
        // Ajouter l'utilisateur dans la base de donnée
        await query ('INSERT INTO utilisateur (Nom,Prenom,Mail,motDePasse,roleId) VALUES (?,?,?,?,? )', [nom,prenom,email,mot_de_passe_hasher,role], 
        (err, result) => {
            res.render('authentification/registerSuccess')
        } )
    } 
    catch (err) {
        res.json({ message: err })
      }
};
