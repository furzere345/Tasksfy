const express = require('express');
const path = require('path');
const router = require('./route/taskRoutes');


const app = express();
app.use(express.json());
app.use(express.static(path.join( __dirname, '../public')));
app.use('/api/tasks',router);
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});