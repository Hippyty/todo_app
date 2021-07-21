function same_task_check(tasks,hash) {
    let flag = false;
    if(tasks===[]){
        return false
    }
    tasks.forEach(e => {
        if(e["hash"] == hash){
            flag = true
        }
    });
    return flag
}

module.exports = same_task_check