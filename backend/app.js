const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();


// Déclaration des routes
const Thing = require('./models/thing')
const stuffControllers = require('./routes/stuff');
const userRoutes = require('./routes/user');
console.log(process.env.DB_CONNECT);

// Connexions à mongoDB
mongoose.connect("mongodb+srv://Camille_bouchacot:mongo@cluster0.h3qg8mp.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Lancement de express
const app = express();

// Headers CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Conversion en JSON
app.use(express.json());

app.post('/api/auth/signup', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...res.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Sauce Enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});



app.post('/api/auth/login', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...res.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Sauce Enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});



// Lancement helmet
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' })); //Pour interdire d'inclure cette page dans une iframe

// Lancement et config rateLimit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Pour 15 min
    max: 100 // limite de 100 requests 
});



app.use(limiter);
app.use(hpp());

// Lancement des routes
app.use('/api/sauces', stuffControllers);
app.use('/api/auth', userRoutes);

module.exports = app;