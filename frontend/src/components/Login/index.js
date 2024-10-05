import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { useEffect } from 'react'
import {jwtDecode} from 'jwt-decode';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import './App.css'

function App(props) {
   const [user,setUser] = useState({});
   const {updateUserName} = props

   const navigate = useNavigate()

  function handleCallbackResponse(response) {
    var userObject = jwtDecode(response.credential);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    console.log(userObject)
    Cookies.set("token",userObject.sub,{expires:20})
    const x = Cookies.get('token');
    updateUserName(userObject.family_name)
    navigate("/");

 }
  useEffect(()=>{
  /*  global google */
  google.accounts.id.initialize({
    client_id : "872196438244-jvus0lffrb76hon10b9nqkimt8ac09dd.apps.googleusercontent.com",
    callback : handleCallbackResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    {
      theme : "outline",size :"xx-large"
    }
  )
  },[]);
  return (
    <>
    <div className='login_nav_bar'>
            <h1 className='logo'>Tensor Go - Login</h1>
        </div>
     <div className = "App">
        
       <div id = "signInDiv"></div>
       { user &&
        <div>
          <img src = {user.picture}></img>
          <h1>{user.name}</h1>
        </div>

       }
     </div>
     </>    
  );


}

export default App;