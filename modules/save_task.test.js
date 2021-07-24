const save_task = require("./save_task")

test('Ssave Task', () => {
    var tasks = [
        {
          "id": 0,
          "hash": "Dimo",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 3,
          "hash": "Recyle",
          "completed": false,
          "user_id": "1"
        },
        {
          "id": 16,
          "hash": "IDKN",
          "completed": false,
          "user_id": "1"
        }
      ]
     expect(save_task(tasks,"amigos",1)).toBe(2)
})
