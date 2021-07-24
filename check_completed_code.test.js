test('should ', () => {
    tasks = [
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
          "id": 4,
          "hash": "IDKN",
          "completed": false,
          "user_id": "1"
        }
      ]
    var id = 0
    tasks.forEach((e)=>{
        if(e.id == 4){
        id = e.id
        }
    })
    tasks[id].completed = true
})
