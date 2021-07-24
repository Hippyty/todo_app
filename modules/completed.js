function completed(tasks,req) {
    tasks = tasks.filter(i=> {if(i.completed == false){
        return 1;
    }})
    return tasks
}
module.exports = completed