import React, { useEffect, useState } from 'react';
import "./Home.css";

const Home = () => { 
    const [userData, setUserData] = useState({});


    const callProfilePage = async () => {
        try {
            const res = await fetch('/profile', {
                method: "GET", 
                headers: {
                    Accept: "application/json", 
                    "Content-Type": "application/json"
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
        }
    }


    useEffect(() => {
        callProfilePage();
    }, []);


    return (
        <>
            <div className="form-body">
                <div className="form-holder">
                            <div className="form-items">

                                <form>
                                    <div class="container" className="profilepanel">
                                                <div class="row" className="profilepanel">
                                                    <h1 
                                                    style={{
                                                        fontSize: '60px',
                                                        fontWeight: 'bold',
                                                        marginBottom: '0',
                                                    }}>WELCOME</h1>
                                                </div>

                                                <div class="row">
                                                    <h4> To The Pagecraft Website Builder! </h4>
                                                    <h4> {userData.name} </h4>
                                                </div>
                                    </div>
                                </form>
                        </div>
                </div>
            </div>
        </>
    )
}

export default Home