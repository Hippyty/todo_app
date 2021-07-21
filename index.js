const express = require('express')
const save = require("./save_user.js")
const check = require("./check_user.js")
const app = express()
const port = 3000
let accounts = []
app.use(express.urlencoded({extended: true}));
app.use(express.json())


app.post('/register', function(req, res) {
  if(req.body["hash"] == null){
      res.status(404).json({"end":false,"message":"Hash was not send"})
      return
  }
  let exists = check(accounts,req.body["hash"])
  if(exists == true){
    res.status(404).json({"end":false,"message":"User already exists"})
    return
  }
  accounts = save(accounts,req.body["hash"])
  console.log(accounts)
  res.send({"end":true,"message":"Acount was saved sucsesfully","number":accounts[accounts.length-1]["id"]});
});

app.get('/login', function(req, res) {
    if(req.body["hash"] == null){
        res.status(404).json({"end":false,"message":"Hash was not send"})
        return
    }
    let exists = check(accounts,req.body["hash"])
    if(exists == false){
        res.status(404).json({"end":false,"message":"User does not exist"})
    }
    
    res.send({"end":true,"message":"Acount was logged in succsesfully","number":accounts[accounts.length-1]["id"]});
  });
app.listen(port, () => console.log(`Example app listening on port port!`))