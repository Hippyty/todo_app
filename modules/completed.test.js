const completed  = require("./completed.js");

test('Completed Test ', () => {
    var tasks = [
        {
          "id": 0,
          "hash": "Animate",
          "completed": true,
          "user_id": "1"
        },
        {
          "id": 1,
          "hash": "Amazon",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 2,
          "hash": "Generator",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 3,
          "hash": "Reproduce",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 4,
          "hash": "Recreate",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 5,
          "hash": "Reanimate",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 6,
          "hash": "Try",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 7,
          "hash": "Late night",
          "completed": false,
          "user_id": "1"
        }
      ]
    console.log(JSON.stringify(completed(tasks)))
    expect(JSON.stringify(completed(tasks))).toBe(JSON.stringify([
        {
          "id": 1,
          "hash": "Amazon",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 2,
          "hash": "Generator",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 3,
          "hash": "Reproduce",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 4,
          "hash": "Recreate",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 5,
          "hash": "Reanimate",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 6,
          "hash": "Try",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 7,
          "hash": "Late night",
          "completed": false,
          "user_id": "1"
        }
      ]))
})
