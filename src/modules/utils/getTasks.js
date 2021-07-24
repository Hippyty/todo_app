export function getTasks(context,setTodoList) {
    fetch('http://localhost:8080/'+context.id+"/task", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                }
            
            }).then(async (response)=>{
                var result = await response.json()
                setTodoList(<ul id = "ul_todo_list"> {result.tasks.map((i,index)=>{
                    return (<li key={index} onClick> {i.hash} </li>)
                })} </ul>)
            })
}