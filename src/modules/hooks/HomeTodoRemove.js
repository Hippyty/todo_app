import { useEffect } from "react";
export function HomeTodoRemoveHook(TodoListIndexRemove,TodoList,setTodoList,setTodoListIndexRemove) {
    useEffect(() => {
        if(TodoListIndexRemove!==-1){
            console.log(TodoListIndexRemove)
            setTodoList(TodoList.filter((e)=>{
                if(e.props.id !== parseInt(TodoListIndexRemove,10)){
                    return true
                }
                return null
            }))
            setTodoListIndexRemove(-1)
        }
        
        return () => {
            return;
        }
    }, [TodoListIndexRemove,TodoList,setTodoList,setTodoListIndexRemove])
}
