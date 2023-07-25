//UserLogin 
//import './login.css';
import React, { useContext, useState, useEffect } from 'react';
import College from './College';
import '../CSS/login.css';
import { Router } from 'react-router-dom';
import axios from 'axios';
import { url } from './MainComponent';
import VerifyEmail from './VerifyEmail';
import { Col, Row } from 'react-bootstrap';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import UploadFile from './UploadFile';

export const UserContext = React.createContext()


function SignUp({ setUser, setlogin }) {


    const UserContextValue = {
        getMail,
        handleSignUp
    }
    // const history = useHistory();
    const [image,setImage]=useState("https://res.cloudinary.com/dofftzsmf/image/upload/v1685886734/UserProfile/Social_Media_Chatting_Online_Blank_Profile_Picture_Head_And_Body_Icon_People_Standing_Icon_Grey_Background_generated_fa3o0b.jpg");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [otpPage, setOtpPage] = useState(false);
    const [err, setError] = useState("");
    const [isNext,setIsNext]=useState(false);


    useEffect(() => {
        setlogin(true)
    })
    function handleUserName(event) {
        const UN = event.target.value;
        if (event.target.value == "" && err !== "")
            setError("")

        setuserName(UN)

        axios.post(`${url}users/checkMail`, { "mail": event.target.value })
            .then((res) => {
                if (!res.data) {
                    // setOtpPage(true);
                    setError("")

                }
                else {
                    console.log(res)
                    setError(`     mail already exist`)
                }
            })
    }
    function handlePassword(event) {
        const PS = event.target.value;
        setPassword(PS);
    }
    function getMail() {
        return userName;
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios.post(`${url}users/checkMail`, { "mail": userName })
            .then((res) => {
                if (!res.data) {
                    // setIsNext(true);
                    setOtpPage(true);
                }
                else {
                    console.log(res)
                    setError(`     mail already exist`)
                }
            })
        // window.location.href = '/verifyEmail';
    }
    function handleSignUp() {
        
        console.log("Here");
        const details =
        {
            "firstName": firstName,
            "lastName": lastName,
            "username": userName,
            "password": password,
            "profile":image,
        }
        fetch("https://main--college-l-web.netlify.app/users/signup", {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        }
        )
            // axios.post(`${url}users/signup`,details,{headers: {
            //     'Content-Type': 'application/json'
            // }})
            .then(res => res.json())
            .then(res => {
                if (res.data) {
                    console.log(res.data)
                    setError('')
                    // BrowserRouter.route('/');
                    // dispatch(push('/'));
                    // window.location.href = '/login'

                }
                else {
                    // console.log("here")
                    // if(res.statusCode == 401)
                    if (res.err.name = "UserExistsError")
                        setError({ message: "User Already Exists" })
                    console.log(res)

                }
            })
            .catch((err) => {
                // if(err.statusCode == 401)

                setError({ message: "Could not register" })
                console.log(err)
            })


    }

    return (
        <>
            {/* <a href='/' className='logo bg-dark w-100 m-0' >
           <img  height={50} width={100} src='logo2.png' className= ""/>
    
           
           </a> */}
            {/* <MainNavbar /> */}
            <div className='m-0'>
            <a href='/' className='logo container' >
                        <img style={{position:"absolute",marginTop:"10px",marginBottom:"10px"}}height={50} width={90} src='https://res.cloudinary.com/dofftzsmf/image/upload/v1690053767/logo-w_evvxgb.png' className="ms-2" />


                    </a>
                {!otpPage&&!isNext  ?
                    <Row style={{marginTop:"10px"}} className='ms-md ms-1'>

                        <Col>

                            <div className='app'>
                                <div className="outer m-auto">
                                    <div className="inner">
                                        <form noValidate onSubmit={handleSubmit}>
                                            <h3>Sign Up</h3>
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" required value={firstName} className="form-control" onChange={e => setFirstName(e.target.value)} placeholder='Enter First Name' />
                                                <label>Last Name</label>
                                                <input type="text" required value={lastName} className="form-control" onChange={e => setLastName(e.target.value)} placeholder='Enter Last Name' />

                                            </div>

                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" required value={userName} name='username' className="form-control"
                                                    onChange={handleUserName} placeholder='Enter User Name' />
                                                <p style={{ color: "red" }}>{err}</p>
                                            </div>
                                            <div className='form-group'>
                                                <label>Password</label>
                                                <input required type="password" value={password} name='password' className='form-control' onChange={handlePassword} placeholder='Enter Password' />
                                                {err && <p className='text-danger ms-3 mb-0 '> {err.message}</p>}
                                                <div>

                                                    <UploadFile handleSignUp={handleSignUp} image={image} setImage={setImage}/>
                                                </div>
                                            </div>
                                            <button type='submit' className='btn btn-dark btn-lg btn-block'>Register</button>
                                            <p className=' fs-9 mt-4 mb-0 text-center'>Already have an account? <a href='/login'>Login</a></p>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </Col>
                        {/* <Col className='my-auto'>
                            <RightSide />
                        </Col> */}
                        
                    </Row> :
                    <div className='mt-5'>
                        {/* {isNext? */}
                        {/* : */}
                        
                        <VerifyEmail mail={userName} handleSignUp={handleSignUp} />
                        {/* }  */}
                    </div>
                    
                    }
                    </div>
                  
        </>

    );
}

export default SignUp;


