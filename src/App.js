import logo from './logo.svg';
import './App.css';
import { createContext, useEffect,useState } from 'react';
import {FormRegAndLog} from "./modules/formregandlog.js"
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function HomeWithoutLogin(){

}
const context = createContext()
function App() {
  const [key, setKey] = useState(false)
  const [cookies, setCookie] = useCookies(["key"])
  const [state, setstate] = useState(null)
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

  let decrypted = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv
        },
        key,
        ciphertext
      ); */
  }, [cookies,setCookie])
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route path="/login">
              <img src={logo} className="App-logo" alt="logo" />
              <h1>Login</h1>
              <FormRegAndLog cookie = {cookies}/>
              <Link to="/register">Sign up</Link>
              key = {key & 1}
            </Route>
            <Route path="/register">
              <img src={logo} className="App-logo" alt="logo" />
              <h1>Register</h1>
              <FormRegAndLog cookie = {cookies}/>
              <Link to="/login">Sign in</Link>
              key = {key & 1}
            </Route>
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
