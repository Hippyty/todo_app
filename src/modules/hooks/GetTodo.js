import { useEffect } from "react";
export function GetTodoHook(context,refresh,setTodoList,setTodoListIndexRemove) {
    useEffect(() => {
        console.log(2)
        fetch('http://localhost:8080/'+context.id+"/task", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }
        
        }).then(async (response)=>{
            var result = await response.json()
            var crib = result.tasks.filter((i)=>{
                if(!i.completed){
                    return 1
                }
                return null
                
            })
            crib = crib.map((i)=>{
                return (<li key={i.id} id = {i.id} onClick = {async (e)=>{
                    var responce = await fetch('http://localhost:8080/'+context.id+"/task/completed", {
                        method: 'POST',
                        body:JSON.stringify({"id":e.target.id}),
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                        }
                    })
                    console.log(await responce.json())
                    setTodoListIndexRemove(e.target.id)
                }}>{i.hash}</li>)
            })
            setTodoList(crib)
            
        })
    return () => {
        return
    }
}, [context,refresh,setTodoList,setTodoListIndexRemove])
}