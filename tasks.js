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
module.exports = {addTasks};
