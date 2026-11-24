const express = require('express');
const { loadTasks, addTasks, completeTask, deleteTask } = require('./tasks');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// 1. Lire toutes les tâches
app.get('/api/tasks', (req, res) => {
    const tasks = loadTasks();
    res.json(tasks);
});

// 2. Ajouter une nouvelle tâche
app.post('/api/tasks', (req, res) => {
    const title = req.body.title;
    if (!title) {
        return res.status(400).json({ error: 'Titre manquant' });
    }
    addTasks(title);
    res.status(201).json({ message: 'Tâche ajoutée' });
});

// 3. Valider une tâche existante
app.patch('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    completeTask(id);
    res.json({ message: 'Tâche validée' });
});

// 4. Supprimer une tâche
app.delete('/api/tasks/:id', (req, res) => {
    const id = req.params.id;
    deleteTask(id);
    res.json({ message: 'Tâche supprimée' });
});

// 5. Lancer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});