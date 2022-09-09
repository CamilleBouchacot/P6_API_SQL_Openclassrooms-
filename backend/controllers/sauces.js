
// J'importe le fichier models "sauce.js", dans ce fichier sauces.js (controllers)
const Sauce = require('../models/Sauce');
const fs = require('fs');


// J'exporte et insère la réponse du serveur concernant le fichier
exports.getSauce = (req, res, next) => {
    Sauce.find()

        // J'installe la réponse , en cas de validité ou en cas d'erreur
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
    console.log('Les Sauces valide');
};

// J'exporte et insère aussi la réponse du serveur , mais cette fois-ci , concernant le module
exports.getSauceById = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })

        // J'installe la réponse , en cas de validité ou en cas d'erreur
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
    console.log('Les Sauces particulière');
};




// J'exporte et insère le serveur avec les imgs , les likes , et les dislikes , avec leurs utilisateur concernés
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new ModelsSauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [' '],
        usersDisliked: [' ']
    });

    // J'installe la réponse , en cas de validité ou en cas d'erreur
    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce ajoutée" }))
        .catch(error => res.status(400).json({ error }));
    console.log('Sauce initialisée');
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
        .catch(error => res.status(400).json({ error }));
    console.log('Sauce modifiée');
};

// Exportation du serveur , pour les sauces supprimées
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })

                    // Même message concernant la validité ou erreurs

                    .then(() => res.status(200).json({ message: 'Sauce supprimée' }))
                    .catch(error => res.status(400).json({ error }));
                console.log('Sauce supprimée');
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Le même principe , pour le serveur , et les exportations , mais cette fois-ci pour les sauces aimées
exports.likeSauce = (req, res, next) => {
    if (req.body.like == 1) {
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $push: { usersLiked: req.body.userId },
                $inc: { likes: +1 }
            }
        )           // Même message concernant la validité ou erreurs
            .then(() => res.status(200).json({ message: 'Sauce liké !' }))
            .catch(error => res.status(400).json({ error }));
    }


    // Application , en cas de validité , pour ce qui concerne les utilisateurs qui ont aimées les sauces
    if (req.body.like == 0) {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 }
                        }
                    )
                        .then(() => res.status(200).json({ message: 'Cette sauce est bien dislikée ' }))
                        .catch(error => res.status(400).json({ error }));
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 }
                        }
                    )
                        // Toujours l'application concernant le message en cas de validité , et fonction "catch" en cas de message d'erreur
                        .then(() => res.status(200).json({ message: 'Cette sauce  est bien dislikée !' }))
                        .catch(error => res.status(400).json({ error }));
                }
            })
            .catch(error => res.status(400).json({ error }));
    }
    // J'applique la même condition "if" , en cas de validité ou en cas d'erreur , au serveur 
    if (req.body.like == -1) {
        // Application de l'id , et du request , concernant les utilisateurs qui ont dislikés
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $push: { usersDisliked: req.body.userId },
                $inc: { dislikes: +1 }
            }
        )
            .then(() => res.status(200).json({ message: 'Sauce enlevée !' }))
            .catch(error => res.status(400).json({ error }));
        console.log('Sauce enlevée !');
    }
    console.log(req.body);
};