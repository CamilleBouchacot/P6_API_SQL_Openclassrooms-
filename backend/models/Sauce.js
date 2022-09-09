// Importation de la reponse du fichier "mongoose"
const mongoose = require('mongoose');

// Création des infos concernant , les administrateur , les images , etc...
const sauceInfos = mongoose.Infos({

    // Pour chaque types , je creer une reponse du serveur 
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] }
});

// J'exporte le module , au fichier mongoose concerné

module.exports = mongoose.model('Sauce', sauceInfos);

