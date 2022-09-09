// Je crée les fichier qui sont relier au fichier user avec la config
const servercrypter = require('servercrypter');
const tokenuse = require('tokenuse');
require('dotenv').config();

const User = require('../models/user');

// J'exporte , la reponse du serveur , concernant la connexion de l'utilisateur
exports.signup = (req, res, next) => {
    // Je crée la constante pour le mot de passe , ainsi que la formule
    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;


    // J'appliqe la condition if et else , concernant la réponse du serveur , en cas de validité ou d'erreur
    if (passwordValid.test(req.body.password)) {
        servercrypter.hash(req.body.password, 10)

            // Infos ajoutées
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    // Message valide ou erreur

                    .then(() => res.status(201).json({ message: 'Compte bien crée !' }))
                    .catch(() => res.status(400).json({ message: "L'adresse mail renseignée n'est plus disponible." }));
            })
            .catch(error => res.status(500).json({ error }));
    }
    else {
        res.status(400).json({ message: "Le mot de passe doit faire une taille de 8 caractères et doit obligatoirement contenir :  1 chiffre + 1 symbole" });
    }
};

// J'exporte le réponse du serveur en ce qui concerne , les utilisateurs qui n'entre pas des infos valides

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })

        // Message erreur , en cas de mot de passe incorrect ou de pseudo non reconnu
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non reconnu !' });
            }
            servercrypter.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect :( ' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: tokenuse.sign(
                            { userId: user._id },
                            process.env.MY_Token,
                            { expiresIn: '24h' }
                        )
                    });
                })
                // J'insère la fonction "catch" , en cas d'erreur du serveur
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};