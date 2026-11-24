const fs = require('fs');
const FILE_PATH = './data.json';

function loadTasks(){
    const data =fs.readFileSync(FILE_PATH,'utf-8');
    return JSON.parse(data);

}
function saveTasks(tasks){
    const data =JSON.stringify(tasks,null,2);
    fs.writeFileSync(FILE_PATH, data);
}
function addTasks(title){
    tasks = loadTasks();
    const newTask = {
        id:Date.now(),
        title:title,
        done:false
    }
    tasks.push(newTask);
    saveTasks(tasks);
    console.log('Tache ajoutee :',title);

}
function listTasks(){
    const tasks = loadTasks();
    if(tasks.length === 0){
        console.log("Aucune tâches pour le moment.");
        return;
    }
    tasks.forEach(task => {
        console.log("Id : ",task.id);
        console.log("titre : ",task.title);
        console.log("status : ",task.done);
        console.log("-------------------");
    });
}
function completeTask(id){
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === Number(id));
    if(!task){
        console.log("Erreur : aucune tâche trouvée avec cet ID");
        return;
    }
    else{
        task.done = true;
        saveTasks(tasks);
        console.log("Tâche terminée : " + task.title);
    }
}
function deleteTask(id){
    const task=loadTasks();
    const filteredTasks = task.filter(t => t.id !== Number(id));
    if(task.length === filteredTasks.length){
        console.log("Erreur : l'ID de la tâche a supprimer n'a pas était trouver");
        return;
    }
    else{
        saveTasks(filteredTasks);
        console.log("Tâche supprimer");
    }
}


module.exports = { addTasks, listTasks,completeTask,deleteTask,loadTasks };
