function check(users,hash) {
    let flag = false;
    console.log(users)
    users.forEach(e => {
        if(e["hash"] == hash){
            flag = true
        }
    });
    return flag
}

module.exports = check