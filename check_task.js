function check_task(tasks,hash) {
    tasks.forEach(e => {
        if(e["hash"] == hash){
            e["completed"] = true
        }
    });
    return tasks
}

module.exports = check_task