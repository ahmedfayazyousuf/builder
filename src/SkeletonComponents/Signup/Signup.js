import React, { useState } from 'react';
import "./Signup.css";
import { NavLink, useHistory } from "react-router-dom";

const Signup = () => {
    const history = useHistory();
    const [user,setUser] = useState({
        name:"",email:"",phone:"",work:"",password:"",cpassword:""
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value})
    }

//fetch api to transfer data
    const PostData = async (e) => {
        e.preventDefault();
        //object destruction so dont need to write user.name etc again and again
        const { name, email, phone, work, password, cpassword } = user;
        
        const res = await fetch("http://localhost:5000/register", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({ 
                // name: name doesnt need to be written because its the same name
                name, email, phone, work, password, cpassword
            })
        });

        const data = await res.json();

        if(data.status === 422 || !data) {
            window.alert("Invalid Credentials - If error persists, contact admin");
            console.log("Invalid Credentials - If error persists, contact admin");
        } else {
            window.alert("Registration Successful! Welcome Aboard!");
            console.log("Registration Successful! Welcome Aboard!");

            history.push("http://localhost:5000/login");
        }

    }

    return (
        <>
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <h3>Registration</h3>
                                <p>Fill in the data below.</p>
                                <form method="POST" id="register-form" className="requires-validation" novalidate>

                                    <div className="col-md-12">
                                        <input className="form-control" type="text" name="name" id="name" value={user.name} onChange={handleInputs} placeholder="Full Name" required/>
                                        <div className="valid-feedback">Username field is valid!</div>
                                        <div className="invalid-feedback">Username field cannot be blank!</div>
                                    </div>

                                    <div className="col-md-12">
                                        <input className="form-control" type="email" name="email" id="email" value={user.email} onChange={handleInputs} placeholder="Email Address" required/>
                                        <div className="valid-feedback">Email field is valid!</div>
                                        <div className="invalid-feedback">Email field cannot be blank!</div>
                                    </div>

                                    <div className="col-md-12">
                                        <input className="form-control" type="number" name="phone" id="phone" value={user.phone} onChange={handleInputs} placeholder="Phone Number" required/>
                                        <div className="valid-feedback">Username field is valid!</div>
                                        <div className="invalid-feedback">Username field cannot be blank!</div>
                                    </div>
 
                                <div className="col-md-12">
                                        <select className="form-select mt-3" name="work" id="work" type="text" value={user.work} onChange={handleInputs} required>
                                            <option selected disabled value="">Position</option>
                                            <option value="Web Developer">Web Developer</option>
                                            <option value="Mechatronics Engineer">Mechatronics Engineer</option>
                                            <option value="Project Manager">Project Manager</option>
                                            <option value="Unity Developer">Unity Developer</option>
                                            <option value="Copy Writer">Copy Writer</option>
                                            <option value="Graphic Designer">Graphic Designer</option>
                                            <option value="Arts Director">Arts Director</option>
                                    </select>
                                        <div className="valid-feedback">You selected a position!</div>
                                        <div className="invalid-feedback">Please select a position!</div>
                                </div>


                                <div className="col-md-12">
                                    <input className="form-control" type="password" name="password" id="password" value={user.password} onChange={handleInputs} placeholder="Password" required/>
                                    <div className="valid-feedback">Password field is valid!</div>
                                    <div className="invalid-feedback">Password field cannot be blank!</div>
                                </div>

                                <div className="col-md-12">
                                    <input className="form-control" type="password" name="cpassword" id="cpassword" value={user.cpassword} onChange={handleInputs} placeholder="Confirm Password" required/>
                                    <div className="valid-feedback">Password field is valid!</div>
                                    <div className="invalid-feedback">Password field cannot be blank!</div>
                                </div>

                                
                                <NavLink to="/login" >I am already registered</NavLink>

                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                                    <label className="form-check-label">I confirm that all data is correct</label>
                                    <div className="invalid-feedback">Please confirm that the entered data is all correct!</div>
                                </div>
                        

                                    <div className="form-button mt-3">
                                        <button id="signup" name="signup" type="submit" className="btn btn-primary" onClick={PostData}>Register</button>
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

export default Signup