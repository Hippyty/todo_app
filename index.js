const express = require("express");
const save_user = require("./save_user.js");
const check_user = require("./check_user.js");
const save_task = require("./save_task.js");
const get_task = require("./get_task.js");
const check_task = require("./check_task.js");
const same_task_check = require("./same_task_check.js");
const app = express();
const port = 3000;
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
 * }
 *
 * 
 * 
 * 
 * 
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
    res.status(404).json({
      end: false,
      message: "Hash was not sent",
    });
    return;
  }
  let exists = check_user(accounts, req.body["hash"]);
  if (exists == true) {
    res.status(404).json({
      end: false,
      message: "User already exists",
    });
    return;
  }
  accounts = save_user(accounts, req.body["hash"]);
  console.log(accounts);
  res.send({
    end: true,
    message: "Acount was saved successfully",
    number: accounts[accounts.length - 1]["id"],
  });
});

app.get("/login", function (req, res) {
  if (req.body["hash"] == null) {
    res.status(404).json({
      end: false,
      message: "Hash was not sent",
    });
    return;
  }
  let exists = check_user(accounts, req.body["hash"]);
  if (exists == false) {
    res.status(404).json({
      end: false,
      message: "User does not exist",
    });
    return;
  }

  res.send({
    end: true,
    message: "Acount was logged in successfully",
    number: accounts[accounts.length - 1]["id"],
  });
});

app.post("/:user_id/task", function (req, res) {
  if (req.body["task_hash"] == null) {
    res.status(404).json({
      end: false,
      message: "Hash was not sent",
    });
    return;
  }
  if(same_task_check(tasks,req.body["task_hash"])){
    res.status(404).json({
      end: false,
      message: "task already exists",
    });
    return;
  }
  save_task(tasks, req.body["task_hash"], req.params["user_id"]);
  res.send({
    end: true,
    message: "Task was saved successfully",
    number: tasks[tasks.length - 1]["id"],
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
  if (req.body["task_hash"] == null) {
    res.status(404).json({
      end: false,
      message: "Hash was not sent",
    });
    return;
  }
  user_tasks = check_task(tasks, req.body["task_hash"]);
  res.send({end: true,
    message: "Task checked successfully"})
});
app.listen(port, () => console.log(`Example app listening on port port!`));
