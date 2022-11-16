const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');


// Connexions à mongoDB
mongoose.connect("mongodb+srv://Camille_bouchacot:mongo@cluster0.h3qg8mp.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});






// Lancement des routes
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

