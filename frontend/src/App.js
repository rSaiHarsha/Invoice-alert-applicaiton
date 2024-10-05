import { Component } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserNameContext from './Context/UserNameContext'
import Home from './components/Home'
import Login from './components/Login'
import Footer from "./components/Footer"
class App extends Component{
    state= {
      username : ''
    }
    updateUserName = (name)=>{
      this.setState({username:name})
    }
    render(){
      const {username} = this.state
      return(
      <>
        <UserNameContext.Provider value={{
          username,
          setUserName : this.updateUserName
        }}>
          <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/login" element={<Login updateUserName={this.updateUserName} />} />
              </Routes>
          </BrowserRouter>
        </UserNameContext.Provider>
       <Footer/>
        </>
      )
    }
}
  



export default App