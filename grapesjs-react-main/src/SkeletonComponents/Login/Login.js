import React, {useState, useContext} from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from '../../App';

const Login = () => {
    // eslint-disable-next-line
    const {state, dispatch} = useContext(UserContext);

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch('https://skeletonserver.herokuapp.com/login', {
            method:"POST",
            headers:{
                'Access-Control-Allow-Origin':'https://thhbuilderenv.vercel.app/',
                "Content-Type" : "application/json"
            }, 
            body:JSON.stringify({
                    email,
                    password
                })
            });

        const data = res.json();

        if(res.status === 400 || !data) {
            window.alert("Invalid Credentials");
        }
        else {
            // dispatch({type: "USER", payload: true})
            window.alert("Login Successful! Welcome Back!");
            history.push("/");
        }
    }
    return (
        <>
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <h3>Login</h3>
                                <p>We are happy to see you again!</p>

                                <form method="POST" className="requires-validation" novalidate>
                                
                                    <div className="col-md-12">
                                        <input className="form-control" type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required/>
                                        <div className="valid-feedback">Email field is valid!</div>
                                        <div className="invalid-feedback">Email field cannot be blank!</div>
                                    </div> 

                                    <div className="col-md-12">
                                        <input className="form-control" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
                                        <div className="valid-feedback">Password field is valid!</div>
                                        <div className="invalid-feedback">Password field cannot be blank!</div>
                                    </div>
                                    
                                    <NavLink to="/signup" >Create an account</NavLink>

                                    <div className="form-button mt-3">
                                    <button id="login" name="login" type="submit" className="btn btn-primary" onClick={loginUser} >Login</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login