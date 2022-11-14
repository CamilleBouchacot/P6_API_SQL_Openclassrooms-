const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use((req, res) => {
//     res.json({ message: 'Votre requête a bien été reçue !' });
// });


app.get('/api/auth/signup', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Sauce 1',
            description: 'Les infos de ma première sauce',
            imageUrl: 'https://coucourennais.fr/wp-content/uploads/2020/12/hotSauce.jpeg',
            price: 8,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Sauce 2',
            description: 'Les infos de ma deuxième sauce',
            imageUrl: 'https://www.roidebretagne.com/I-Grande-61200-sauce-piquante-zephyr-100-ml.net.jpg',
            price: 9,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff);
});

app.get('api/auth/login', (req, res, next) => {
    const getLogin = [
        {
            _id: 'oeihfzeoi',
            title: 'Sauce 1',
            description: 'Les infos de ma première sauce',
            imageUrl: 'https://coucourennais.fr/wp-content/uploads/2020/12/hotSauce.jpeg',
            price: 8,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Sauce 2',
            description: 'Les infos de ma deuxième sauce',
            imageUrl: 'https://www.roidebretagne.com/I-Grande-61200-sauce-piquante-zephyr-100-ml.net.jpg',
            price: 9,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(getLogin);
})

app.post('/api/auth/signup', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...res.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Connexion réussie !' }))
        .catch(error => res.status(400).json({ error }));
});



app.post('/api/auth/login', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...res.body
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Inscription réussie !' }))
        .catch(error => res.status(400).json({ error }));
});


// Lancement des routes
// app.use('/api/stuff', stuffControllers);
// app.use('/api/auth', userRoutes);

module.exports = app;

