// Importation de mongoose dans le fichier app.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://User_P6_Hotakes-Camille:<Security>@cluster0.g9lkbpp.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


