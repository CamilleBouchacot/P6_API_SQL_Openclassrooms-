// Importation de la reponse du fichier "mongoose"

const mongoose = require('mongoose')

// Pour chaque types , je creer une reponse du serveur 
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
})

// J'exporte le module , au fichier mongoose concerné

module.exports = mongoose.model('Sauce', sauceSchema)

