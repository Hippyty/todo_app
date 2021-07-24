function save_task(tasks,hash,id) {
    var id2 = 0
    if(tasks.length !==0){
        id2 = tasks[tasks.length-1]["id"]+1
    }
    tasks.push({"id":id2,"hash":hash,"completed":false,user_id:id})
    return tasks
}
module.exports = save_task