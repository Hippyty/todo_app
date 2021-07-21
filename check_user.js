function check_user(users,hash) {
    let flag = false;
    if(users===[]){
        return false
    }
    users.forEach(e => {
        if(e["hash"] == hash){
            flag = true
        }
    });
    return flag
}

module.exports = check_user