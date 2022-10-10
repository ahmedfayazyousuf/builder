import React, { useEffect, useState } from 'react';
import formimage from "./formimage.png";
import { useHistory } from "react-router-dom";
 
const Profile = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({});


    const callProfilePage = async () => {
        try {
            const res = await fetch('https://skeletonserver.herokuapp.com/profile', {
                method: "GET", 
                headers: {
                    Accept: "application/json", 
                    'Access-Control-Allow-Origin':'https://thhbuilderenv.vercel.app/',
                    "Content-Type": "application/json",
                },
                credentials: "include" //so cookies get sent to backend
            });
            
            const data = await res.json(); //if data is get
            console.log(data);
            setUserData(data);

            if(!res.status === 200 ){ //user doesnt exist, hasnt logged in
                const error = new Error(res.error);
                throw error;
            }
             
        } catch(err) {
            console.log(err);
            history('/login');
        }
    }


    useEffect(() => {
        // eslint-disable-next-line
        callProfilePage();
        // eslint-disable-next-line
    }, []);


    return (
        <>
                <div className="form-holder">
                    <div className="form-itemss">

                        <form method="GET">
                            <div class="container" className="profilepanel">
                                        <div class="row" className="profilepanel">
                                            <div class="col">
                                                <img src={formimage} alt="FormImage"/>
                                            </div>
                                            {/* eslint-disable-next-line */}
                                            <h6></h6>
                                            <h5>{userData.name}</h5>
                                        </div>
                                        {/* eslint-disable-next-line */}
                                        <div class="row">
                                            {/* eslint-disable-next-line */}
                                            <h6></h6>
                                            <h6>User ID: {userData._id}</h6>
                                            {/* eslint-disable-next-line */}
                                            <h6></h6>
                                            <h6>Username: {userData.name}</h6>
                                            {/* eslint-disable-next-line */}
                                            <h6></h6>
                                            <h6>Email: {userData.email}</h6>
                                            {/* eslint-disable-next-line */}
                                            <h6></h6>
                                            <h6>Phone no: {userData.phone}</h6>
                                            {/* eslint-disable-next-line */}
                                            <h6></h6>
                                            <h6>Profession: {userData.work}</h6>
                                        </div>


                                        <div className="form-button mt-3">
                                            <button type="submit" className="btn btn-primary">Edit Profile</button>
                                        </div>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    )
}

export default Profile