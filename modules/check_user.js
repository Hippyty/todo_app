function check_user(users,hash) {
    let flag = 0;
    if(users===[]){
        return 0
    }
    var i =0;
    users.forEach(e => {
        if(flag!==0){
            
        }else{
        
        i++
        if(e["hash"] == hash){
            flag = i
        }
    }
        
    });
    return flag
}

module.exports = check_user