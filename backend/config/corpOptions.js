const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST',
    credentials: true, // Autoriser l'envoi de cookies ou d'en-têtes d'authentification
    optionsSuccessStatus: 204, // Retourner 204 No Content pour les pré-vérifications OPTIONS
  };

module.exports = {corsOptions}  