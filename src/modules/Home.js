import { useContext,useState } from "react";
import { LoggedIn } from "./userContext";
import { Link } from "react-router-dom";
import { Formik,Form,Field } from "formik";
import * as  HomeTodoRemove from "./hooks/HomeTodoRemove"
import * as  AddTodo from "./hooks/AddTodo"
import * as  GetTodo from "./hooks/GetTodo"
export function Home(params) {
    const context = useContext(LoggedIn)
    const [Todoo, setTodo] = useState("")
    const [refresh,setRefresh] = useState(0)
    const [TodoList,setTodoList] = useState(null)
    const [TodoListIndexRemove,setTodoListIndexRemove] = useState(-1)
    HomeTodoRemove.HomeTodoRemoveHook(TodoListIndexRemove,TodoList,setTodoList,setTodoListIndexRemove)
    AddTodo.AddTodoHook(context,Todoo)
    GetTodo.GetTodoHook(context,refresh,setTodoList,setTodoListIndexRemove)

    console.log(context)
    let main_code = <h1>a</h1>
    if(context.logged_in === true){
        main_code = (<div id="component">
                        <button onClick={()=>{
                            params.setwipe(true)
                        }}>Log out</button>
                        <h1 className="title-all">Home</h1>
                        <h1 className="small-title" id="welcome">Welcome {context.username}</h1>
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
                                    <br/>
                                    <Field id="Todo" className="inputer" name="Todo" placeholder="Jane" />
                                    <button type="submit" className="plus_button"><span className="material-icons">add</span></button>
                                </Form>
                                </Formik>
                        <button onClick={()=>{
                            setRefresh(refresh+1)
                        }}>Refresh</button>
                        <div id="todos">
                            <ul id = "ul_todo_list">{TodoList}{console.log(TodoList)}</ul>
                        </div>
                    </div>)
    }else{
        main_code = (<div id="component" >
        <h1 className="title-all">Home</h1>
        <h1 className="small-title">You dont have an acount please: </h1>
        <Link to="/login" className="Home_sign_in">Sign in </Link>
        <Link to="/register" className="Home_sign_up">Sign up</Link>
    </div>)
    }
    return(<div>{main_code}</div>)    
}