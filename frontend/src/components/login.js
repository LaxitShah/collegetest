//UserLogin 
//import './login.css';
import { Modal } from 'react-bootstrap';
import React, { useContext, useState, useEffect } from 'react';
import College from './College';
import { Alert } from 'bootstrap';
import { Link } from 'react-router-dom';



function UserLogin({ setUser, setlogin, isModal }) {

    // const history = useHistory();
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [err, setError] = useState("");

    useEffect(() => {
        if(!isModal)
        setlogin(true)
    })
    function handleUserName(event) {
        const UN = event.target.value;
        setuserName(UN)
    }
    function handlePassword(event) {
        const PS = event.target.value;
        setPassword(PS);
    }
    function handleLogin(event) {
        event.preventDefault();
        // console.log("USer name :"+userName+" password: "+password)
        fetch("https://collegeweb-backend-6tic.onrender.com/users/login", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": userName,
                "password": password
            })
        }
        )
            .then(res => res.json())
            .then(res => {
                if (res.user) {
                    localStorage.setItem("JWTtoken", res.token);
                    setUser(res.user)
                    console.log(res.user)
                    setError('')
                    // BrowserRouter.route('/');
                    // dispatch(push('/'));
                    window.location.href = '/'

                }
                else {
                    setError(res.err)
                    console.log(res.err)
                    // alert(res.err)
                }
            })
            .catch((err) => console.log(err))
    }
    return (
        <>
            {isModal ?

                <div className="outer">
                    <div className="inner">
                        <form onSubmit={handleLogin}>
                            <h3>Log in</h3>
                            <div className="form-group">
                                <label>UserName</label>
                                <input type="text" value={userName} className="form-control" onChange={handleUserName} placeholder='Enter User Name' />
                            </div>
                            <div className='form-group'>
                                <label>Password</label>
                                <input type="password" value={password} className='form-control' onChange={handlePassword} placeholder='Enter Password' />
                                {err && <p className='text-danger ms-3 mb-0 '> {err.message}</p>}
                            </div><br />
                           
                            <Link to='/forgotPassword'> <p>forgotPassword?</p></Link>

                            <button type='submit' className='btn btn-dark btn-lg btn-block'>LogIn</button>
                            {/* <p className='forgot-password text-right'><a href='#'>Forgot Password</a></p> */}
                            <p className='text-center mt-3 mb-0'>Don't have an account?<a href='users/signup'> Sign Up</a></p>
                        </form>
                    </div>
                </div>


                :
                <div className='app'>
                    <a href='/' className='logo container' >
                        <img style={{position:"absolute",marginTop:"10px",marginBottom:"40px"}}height={50} width={90} src='https://res.cloudinary.com/dofftzsmf/image/upload/v1689877157/logo-w_l6dkuc.png' lassName="ms-3" />


                    </a>
                    <div className="outer">
                        <div className="inner">
                            <form onSubmit={handleLogin}>
                                <h3>Log in</h3>
                                <div className="form-group">
                                    <label>UserName</label>
                                    <input type="text" value={userName} className="form-control" onChange={handleUserName} placeholder='Enter User Name' />
                                </div>
                                <div className='form-group'>
                                    <label>Password</label>
                                    <input type="password" value={password} className='form-control' onChange={handlePassword} placeholder='Enter Password' />
                                    {err && <p className='text-danger ms-1 mb-0 '> {err.message}</p>}
                                    <Link  style={{color:"#2f2f30",fontSize:"16px"}} to='/forgotPassword'> <p>Forgot Password?</p></Link>
                                </div>
                                <button type='submit' className='btn btn-dark btn-lg btn-block'>LogIn</button>
                                {/* <p className='forgot-password text-right'><a href='#' onClick={() => alert("nai thay badam khao")} >Forgot Password</a></p> */}
                                <p className='text-center mt-3 mb-0'>Don't have an account?<a href='/signup'> Sign Up</a></p>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

export default UserLogin;


