const express = require('express');
const { loadTasks, addTasks, completeTask, deleteTask } = require('../services/tasks');

const router = express.Router();


// 1. Lire toutes les tâches
router.get('/', (req, res) => {
    const tasks = loadTasks();
    res.json(tasks);
});

// 2. Ajouter une nouvelle tâche
router.post('/', (req, res) => {
    const title = req.body.title;
    if (!title) {
        return res.status(400).json({ error: 'Titre manquant' });
    }
    addTasks(title);
    res.status(201).json({ message: 'Tâche ajoutée' });
});

// 3. Valider une tâche existante
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    completeTask(id);
    res.json({ message: 'Tâche validée' });
});

// 4. Supprimer une tâche
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    deleteTask(id);
    res.json({ message: 'Tâche supprimée' });
});
module.exports = router;
