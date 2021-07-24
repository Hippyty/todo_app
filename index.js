const express = require("express");
const save_user = require("./modules/save_user.js");
const check_user = require("./modules/check_user.js");
const save_task = require("./modules/save_task.js");
const get_task = require("./modules/get_task.js");
const same_task_check = require("./modules/same_task_check.js");
const completed = require("./modules/completed");
const app = express();
const port = 8080;
/**
 * Acount schema
 *
 * {
 *  hash:String
 *  id:Int
 *
 * }
 */

/**
 *
 * Task schema
 *
 * {
 * task_hash:id
 * id:Int
 * completed:BOOL
 * user_id
 * }
 *
 * /tasks/:user_id


    /login/user_hash

   /register/user_hash

 */
let accounts = [];
let tasks = [];
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post("/register", function (req, res) {
  if (req.body["hash"] == null) {
    res.json({
      end: false,
      message: "Hash was not sent",
    });
    return;
  }
  let exists = check_user(accounts, req.body["hash"]);
  if (exists !== 0) {
    res.json({
      end: false,
      message: "User already exists",
    });
    return;
  }
  accounts = save_user(accounts, req.body["hash"]);
  res.send({
    end: true,
    message: "Acount was saved successfully",
    number: accounts[accounts.length - 1]["id"]+1,
  });
});

app.post("/login/", function (req, res) {
  if (req.body["hash"] == null) {
    res.json({
      end: false,
      message: "Hash was not sent",
    });
    return;
  }
  let exists = check_user(accounts,req.body["hash"]);
  if (exists == 0) {
    res.json({
      end: false,
      message: "User does not exist",
    });
    return;
  }

  res.send({
    end: true,
    message: "Acount was logged in successfully",
    number: exists,
  });
});

app.post("/:user_id/task", function (req, res) {
  if (req.body["task_hash"] == null) {
    res.json({
      end: false,
      message: "Hash was not sent",
    });
    return;
  }
  if(same_task_check(tasks,req.body["task_hash"])){
    res.json({
      end: false,
      message: "task already exists",
    });
    return;
  }
  if(req.body["task_hash"] === ""){
    res.json({
      end: false,
      message: "No task",
    });
    return;
  }
  save_task(tasks, req.body["task_hash"], req.params["user_id"]);
  res.send({
    end: true,
    message: "Task was saved successfully",
    number: tasks[tasks.length - 1].id,
  });
});

app.get("/:user_id/task", function (req, res) {
  let user_tasks = get_task(tasks, req.params["user_id"]);
  res.send({
    end: true,
    message: "Task listed successfully",
    tasks: user_tasks,
  });
});

app.post("/:user_id/task/completed", function (req, res) {
  if (req.body["id"] == null) {
    res.json({
      end: false,
      message: "id was not sent",
    });
    return;
  }
  var id = 0
  tasks.forEach((e,index)=>{
    if(e.id == req.body["id"]){
      id = index
    }
  })
  tasks[id].completed = true
  tasks = completed(tasks,req)
  res.send({end: true,
    message: "Task checked successfully"})
});
app.listen(port, () => console.log(`Example app listening on port port!`));
