import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
import {FormRegAndLog} from "./modules/formregandlog.js"
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { LoggedIn } from "./modules/userContext";
import { Home } from "./modules/Home";


function App() {
  const [id, setId] = useState(0)
  const [key, setKey] = useState(false)
  const [cookies, setCookie] = useCookies(["key"])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userOn, setUserOn] = useState(false)
  const [wipe, setWipe] = useState(false)
  useEffect(() => {
    if(cookies["key"] != null){
      setKey(true)
      crypto.subtle.importKey("jwk",cookies["key"],{name:"AES-GCM"},true,["encrypt"]).then((data)=>{
        console.log(data)
      })
    }else{
      crypto.subtle.generateKey({
        name: "AES-GCM",
        length: 256
      },
      true,
      ["encrypt", "decrypt"]).then(data=>{
        crypto.subtle.exportKey("jwk",data).then(kew_json_format=>{
          setCookie("key",JSON.stringify(kew_json_format))
          
          setKey(true)
        })})
    }
    
  //key
  
  /* 
*/
  }, [cookies,setCookie])

  useEffect(() => {
    if(username && password && id){
      setUserOn(true)
    }
  }, [username,password,setPassword,setUsername,userOn,setUserOn,id])
  useEffect(() => {
    if(wipe!==false){
      setPassword("")
      setUsername("")
      setUserOn(false)
      setWipe(false)
      setId(0)
    }
    
  }, [username,password,setPassword,setUsername,userOn,setUserOn,wipe,setWipe,id,setId])
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <LoggedIn.Provider value={{username:username,
                                  password:password,
                                  logged_in:userOn,id:id}}
                                  > 
          <Switch>
            <Route path="/:link">
              <img src={logo} className="App-logo" alt="logo" />
              <FormRegAndLog cookie = {cookies} setUsername = {setUsername} setPassword = {setPassword} setId = {setId}/>
              {/* <Link to="/register">Sign up</Link>
              <Link to="/">Home</Link> */}
            </Route>
            <Route path="/">
              <img src={logo} className="App-logo" alt="logo" />
              <Home setwipe={setWipe}/>
            </Route>
          </Switch>
          </LoggedIn.Provider>
          key = {key & 1}
        </header>
      </div>
    </Router>
  );
}

export default App;
