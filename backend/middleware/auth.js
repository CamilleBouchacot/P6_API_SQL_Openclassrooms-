const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //on split le bearer du token pour ensuite récupérer le deuxième élément de cet array qui est le token
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable!';
        } else {
            next();
        }
    }
    catch {
        res.status(401).json({
            error: new Error('Requête non authentifiée')
        });
    }
};