function save_task(tasks,hash,id) {

    tasks.push({"id":tasks.length,"hash":hash,"completed":false,user_id:id})
    return tasks
}
module.exports = save_task