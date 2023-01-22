import React, {useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";
import thhlogoo from "./thhlogoo.png";
import { UserContext } from '../../App';

const Navbar = () => {
    // eslint-disable-next-line
    const {state, dispatch} = useContext(UserContext);
    const RenderMenu = () => {
        if(state) {
            return (
                <>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile">Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/formbuilder">Webbuilder</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile">Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/formbuilder">Webbuilder</NavLink>   
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">SignUp</NavLink>
                    </li>
                </>
            )
        }
    }

    return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#00171D'}}>   
        <NavLink className="navbar-brand" to="/">
            <img style={{width: '100px', marginLeft: '15px'}} src={thhlogoo} alt="the hanging house logo"/>
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">

                <RenderMenu />
                
            </ul>
        </div>
    </nav>
  )
}

export default Navbar