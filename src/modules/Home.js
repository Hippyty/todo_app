import { useContext,useEffect,useState } from "react";
import { LoggedIn } from "./userContext";
import { Link } from "react-router-dom";
import { Formik,Form,Field } from "formik";



export function Home(params) {
    const context = useContext(LoggedIn)
    const [Todoo, setTodo] = useState("")
    const [refresh,setRefresh] = useState(0)
    const [TodoList,setTodoList] = useState(null)
    useEffect(() => {
            console.log(1)
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
    }, [params.cookie,context,Todoo])
    useEffect(() => {
            console.log(2)
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
        return () => {
            return
        }
    }, [params.cookie,context,refresh,setTodoList])

    console.log(context)
    let main_code = <h1>a</h1>
    if(context.logged_in === true){
        main_code = (<div id="component">
                        <button onClick={()=>{
                            params.setwipe(true)
                        }}>Log out</button>
                        <h1 id="welcome">Welcome {context.username}</h1>
                            <Formik
                                initialValues={{
                                    Todo: '',
                                }}
                                onSubmit={async (values) => {
                                    setTodo(values.Todo)
                                }}
                                >
                                <Form>
                                    <label htmlFor="Todo">Todo to add</label>
                                    <Field id="Todo" name="Todo" placeholder="Jane" />
                                    <button type="submit">Submit</button>
                                </Form>
                                </Formik>
                        <button onClick={(e)=>{
                            setRefresh(refresh+1)
                        }}>Refresh</button>
                        <div id="todos">
                            {TodoList}
                        </div>
                    </div>)
    }else{
        main_code = (<div id="component">
        <h1>You dont have an acount please: </h1>
        <Link to="/login">Sign in</Link>
        <br/>
        <Link to="/register">Sign up</Link>
    </div>)
    }
    return(<div>{main_code}</div>)    
}