const {addTasks} =  require('./tasks');
const args = process.argv.slice(2);
const command = args[0];
const argument = args[1];
if (command === 'add'){
    if(args.length<2){
        console.log("Erreur : il manque un arguments.")
        return;
    }
    else{
        addTasks(argument);
        return;
   }
}else{
    console.log("Commande inconnue. Utilise : node index.js add\"Ma tache\"");
    return;
}
