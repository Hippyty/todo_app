function get_task(tasks,id) {
    let user_tasks = []
    if(tasks===[]){
        return false
    }
    tasks.forEach(e => {
        if(e["user_id"] == id){
            user_tasks.push(e)
        }
    });
    return user_tasks
}

module.exports = get_task