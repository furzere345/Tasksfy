const { addTasks, listTasks } = require('./tasks');

const args = process.argv.slice(2);
const command = args[0];
const argument = args[1];

if (command === 'add') {
    if (args.length < 2) {
        console.log("Erreur : il manque le titre de la tâche.");
        return;
    }
    addTasks(argument);

} else if (command === 'list') {
    listTasks();

} else {
    console.log('Commande inconnue. Utilise :');
    console.log('  node index.js add "Ma tâche"');
    console.log('  node index.js list');
}
