function save_task(tasks,hash) {
    tasks.push({"id":tasks.length,"hash":hash,"compleated":false})
    return tasks
}
module.exports = save_task