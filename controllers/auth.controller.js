const bcrypt = require("bcrypt");
const validator = require("validator");
const joi = require("joi");

// GET -  Afficher la page d'inscription 
exports.getRegisterPage = async (req, res) => {
    res.render('authentification/register', { message: req.flash("message")})
    // Envoie dans le dossier views
};

// POST - Créer un utilisateur 
exports.postRegisterPage = async (req, res) => {
    
    // 1 - Parser les données
    const { nom, prenom, email, motdepasse, role } = req.body
    // 1.1 - Verifier le formulaire
    // const emailValidator = validator.isEmail(email)
    // if(!emailValidator == true)
    // {
    //     req.flash('message', 'Vous devez rentrer un email')
    //     return res.redirect('/auth/register')
    // }

    const schema = joi.object().keys({
        password: joi.string().min(6).max(20).required()
      });
      
      const dataToValidate = {
        password: motdepasse,
    }
    const result = schema.validate(dataToValidate);
    if (result.error) {
      // throw result.error.details[0].message;
      req.flash('message', 'Le mot de passe doit être de 6 à 20 caractères')
        return res.redirect('/auth/register')
    }    

    // 2 - Si l'email existe    
    const emailExiste = await querySql ('SELECT COUNT(*) AS cnt FROM utilisateur WHERE ?? = ? ', ["Mail",email]) // Requete préparé contre l'injection Sql
    if (emailExiste[0].cnt > 0) {
        req.flash('message', 'L\'email existe deja')
        return res.redirect('/auth/register')
    }

    // 3 - Ajouter l'utilisateur dans la base de donnée
    try { 
        // 4 - Hasher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const mot_de_passe_hasher = await bcrypt.hash(motdepasse, salt);
        // res.send(`Le mot de passe hasher est : ${mot_de_passe_hasher}`)
        await querySql ('INSERT INTO utilisateur (Nom,Prenom,Mail,motDePasse,roleId) VALUES (?,?,?,?,? )', [nom,prenom,email,mot_de_passe_hasher,role], 
        (err, result) => {
            if(err) {
                req.flash("message", `Il y a une erreur ${err}`);
                return res.redirect('/auth/register')
              }
              req.flash("message", "Inscription avec succès !");
              return res.redirect('/auth/login')
        } )
    } 
    catch (err) {
        res.json({ message: err })
      }
};

// GET  Afficher la page de connection
exports.getLoginPage = async (req, res) => {
    res.render('authentification/login', { message: req.flash("message")})
};

// POST S'authentifier 
exports.postLoginPage = async (req, res) => {
    const {email, motdepasse} = req.body;

    // 1 - Si l'email n'existe pas
    const findEmail = await querySql('SELECT COUNT(*) AS cnt FROM utilisateur WHERE Mail = ?', email)
    if (!findEmail[0].cnt > 0) {
      req.flash("message", "Aucun utilisateur avec cet email")
      return res.redirect('/auth/login')
    }

     // 2 - Vérifier le mot de passe
     const user = await querySql('SELECT UtilisateurId, Nom, Prenom, Mail, motDePasse FROM utilisateur WHERE Mail = ?', email)
     const passwordCheck = await bcrypt.compare(motdepasse, user[0].motDePasse)
    if(!passwordCheck) {
    req.flash("message", "Mot de passe incorret")
    return res.redirect('/auth/login')
   }
   else {
       // 3 - Créer une session
              req.session.user = {
                id : user[0].UtilisateurId,
                firstname: user[0].Nom,
                lastname: user[0].Prenom,
                email: user[0].Mail
              };
              console.log("session ", req.session.user);
              return res.redirect('/');
   }
};
// 1 -  Se deconnecter
exports.getLogoutPage = async (req, res) => {
    req.session.destroy(function(err) {
      res.redirect("/auth/login");
   })
  }