import { useEffect } from "react";

export function AddTodoHook(context,Todoo) {
    
    useEffect(() => {
        fetch('http://localhost:8080/'+context.id+"/task", {
                method: 'POST',
            body:JSON.stringify({"task_hash":Todoo}),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            }

        }).then(async (response)=>{
            var result = await response.json()
            console.log(result)
        })
    return () => {
        return
    }
}, [context,Todoo])
}