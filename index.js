const { addTasks, listTasks,completeTask } = require('./tasks');

const args = process.argv.slice(2);
const command = args[0];
const argument = args[1];
const commands = {
    add: () => {
        if(!argument) return console.log("Erreur : il manque le titre.")
            addTasks(argument);
        },
    list: () => {
        listTasks();
    },
    done: () => {
        if(!argument) return console.log("Erreur : il manque l'ID")
            completeTask(argument);
    }
};
if(commands[command]){
    commands[command]();
}else{
    console.log("Commande inconnue. Utilise : add, list ou done.");
}