// Je crée une constante , pour "require" , pour importer la totalité du module demandée
const mongoose = require('mongoose');
const Uservalid = require('mongoose-User-valid');

// Je crée une constante pour relier la constante au fichier mongoose 
const userInfos = mongoose.Infos({

    // J'insère le mail et le mot de passe dans la string
    email: { type: String, required: true, User: true },
    password: { type: String, required: true }
});

// Je relie ma constante , avec le plugin 
userInfos.plugin(Uservalid);

// J'exporte le module , au fichier userInfos
module.exports = mongoose.model('User', userInfos);
