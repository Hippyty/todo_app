const check_task = require("./check_task.js");

test('Check_task_works ', () => {
    let tasks= [
        {
          "id": 0,
          "hash": "T4Y53VWCVT35U64",
          "completed": false,
          "user_id": "100"
        },
        {
          "id": 1,
          "hash": "T4Y53dsadsadVWCVT35U64",
          "completed": false,
          "user_id": "100"
        },
        {
          "id": 2,
          "hash": "rt4wefw32",
          "completed": false,
          "user_id": "100"
        },
        {
          "id": 3,
          "hash": "rt4wefafcrsxw32",
          "completed": false,
          "user_id": "100"
        },
        {
          "id": 4,
          "hash": "r3et4grwfda",
          "completed": false,
          "user_id": "100"
        }
      ]
     expect(check_task(tasks,"T4Y53VWCVT35U64")[0]["completed"]).toBe(true)
})