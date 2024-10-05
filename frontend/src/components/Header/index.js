import { useNavigate } from 'react-router-dom' 
import Cookies from 'js-cookie'
import UserNameContext from '../../Context/UserNameContext'
import './index.css'
const Header = (props) => {
    const {history} = props 
    const navigate = useNavigate()
   const onClickSignOut=()=>{
    Cookies.remove('token')
    navigate('/login')
   }
    return (
        <UserNameContext.Consumer>
            {value =>{
                const {username} = value 
                return (
                    <nav className='nav_container'>
                        <div className="nav_item">
                            <h1 className="nav_bar_main_heading">Tensor Go</h1>
                        </div>
                        <div className='right_side_container'>
                            <h1 className='username'>{username}</h1>
                            <button className="sign_out_button" onClick={onClickSignOut}>Sign Out</button>
                        </div>
                    </nav>
                )
            }}
        </UserNameContext.Consumer>
    )
}

export default Header