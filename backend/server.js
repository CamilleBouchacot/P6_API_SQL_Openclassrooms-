// Requête http et envoie des réponses
const http = require('http');
const app = require('./app');

// La fonction normalizePort renvoie un port valide
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {

        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

// Ajout du port de connection , si aucun port alors , port 3000
const port = normalizePort(process.env.PORT || '3000');

// La fonction errorHandler recherche toutes les erreurs et les gères
const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port : ${port}`;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges.`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Création serveur express avec app
// Constante qui permet les appels serveurs
const server = http.createServer(app);

// Lancement du serveur et affiche le port correspondant
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
    console.log(`Listening on ${bind}`);
});

// Le serveur écoute le port
server.listen(port);



