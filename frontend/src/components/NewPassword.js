//UserLogin 
//import './login.css';
import { Modal } from 'react-bootstrap';
import React, { useContext, useState, useEffect } from 'react';
import College from './College';
import { Alert } from 'bootstrap';
import axios from 'axios';
import { url } from './MainComponent';



function NewPassword({ mail }) {

    // const history = useHistory();
    const [password, setPassword] = useState("");
    const [err, setError] = useState("");

    useEffect(() => {
    

    })
  
    function handlePassword(event) {
        const PS = event.target.value;
        setPassword(PS);
    }
    function handleLogin(event) {
        event.preventDefault();
        axios.put(`${url}users/update-password`,{"username":mail,"newPassword":password})
        .then((res)=>{
        window.location.href = '/login'
        })
        .catch((err)=>console.log(err))
    
          }
    return (
        <>
         

                <div style={{marginTop:"170px"}}>
                    <div className="inner">
                        <form onSubmit={handleLogin}>
                            <h3>New Password</h3>
                        
                            <div className='form-group'>
                                <label>Password</label>
                                <input type="password" value={password} className='form-control' onChange={handlePassword} placeholder='Enter Password' />
                                {err && <p className='text-danger ms-3 mb-0 '> {err.message}</p>}
                            </div><br />
                            <button type='submit'  className='btn btn-dark btn-lg btn-block'>LogIn</button>
                            <p className='text-center mt-3 mb-0'>Don't have an account?<a href='/signup'> Sign Up</a></p>
                        </form>
                    </div>
                </div>


             
        </>

    );
}


export default NewPassword;
