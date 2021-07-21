function save(users,hash) {
    users.push({"id":users.length,"hash":hash})
    return users
}
module.exports = save