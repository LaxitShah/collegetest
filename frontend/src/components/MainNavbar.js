import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Search from './Search';
import  { useState } from 'react';
import '../CSS/mainNavbar.css';
import { useEffect } from 'react';
import axios from 'axios';
// import { DropdownItem } from 'reactstrap';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// import { Dropdown } from 'react-suit';

function MainNavbar({ user,direction, ...args  }) {
  

  const [activeLink, setActiveLink] = useState(null);
  // const [profile,setProfile]=useState("https://res.cloudinary.com/dofftzsmf/image/upload/v1685886734/UserProfile/Social_Media_Chatting_Online_Blank_Profile_Picture_Head_And_Body_Icon_People_Standing_Icon_Grey_Background_generated_fa3o0b.jpg");
 const [profile,setProfile]=useState("https://res.cloudinary.com/dofftzsmf/image/upload/v1686467326/UserProfile/12_nxrzov.png");
  const handleLogOut = () => {
  localStorage.removeItem('JWTtoken');
  window.location.reload();
};
// useEffect(()=>{
  
// })
const navLinkStyles = {
  color: "white",
  textDecoration: "none",
  padding: "0.5rem 1rem",
  transition: "transform 0.3s, color 0.3s",
};
const [dropdownOpen, setDropdownOpen] = useState(false);
const toggle = () => setDropdownOpen((prevState) => !prevState);
const navLinkHoverStyles = {
  ...navLinkStyles,
  color: "#EED016",
  transform: "scale(1.1)",
};
const [isMenuOpen, setIsMenuOpen] = useState(true);

const handleIconClick = () => {
  console.log("hi")
  setIsMenuOpen(!isMenuOpen);
};
  return (
    <div>
      <div className='main-navbar-height'>
        <Navbar collapseOnSelect expand="lg"  style={{backgroundColor:"#20262E"}}>
          <Container className="nav-container">
            <Navbar.Brand href="/"  style={{ overflow: "hidden"}}>
              {/* <img height={70} width={80} src='https://res.cloudinary.com/dofftzsmf/image/upload/v1684658496/logo_w6k1js.png' className=" " /> */}
             {/* <div className='margin-logo'> */}
             <img  height={50}   width={100}
             style={{marginTop:"0px",marginLeft:"10px"}}
              src='https://res.cloudinary.com/dofftzsmf/image/upload/v1685876348/CollegeWeb_logo/finalNoBG_g6pin3.png' className=" " />

             {/* </div> */}
            
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />
            {/* <div style={{border:'solid',width:'100%'}}> */}
            <Search   />
            {/* </div> */}
           <div className='margin-nav-list'>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="nav-link-container">
              <Link
                    className='nav-link nav-link-custom '
                    to="/"
                    style={navLinkStyles}
                    onMouseEnter={(e) => {
                        e.target.style.color = navLinkHoverStyles.color;
                        e.target.style.transform = navLinkHoverStyles.transform;
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = navLinkStyles.color;
                        e.target.style.transform = "scale(1)";
                    }}
                    >
                  Home
                </Link>
                <Link
                    className='nav-link nav-link-custom'
                    to="/colleges"
                    style={navLinkStyles}
                    onMouseEnter={(e) => {
                        e.target.style.color = navLinkHoverStyles.color;
                        e.target.style.transform = navLinkHoverStyles.transform;
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = navLinkStyles.color;
                        e.target.style.transform = "scale(1)";
                    }}
                    >
                  Colleges
                </Link>
                <Link
                    className='nav-link nav-link-custom'
                    to="/contactus"
                    style={navLinkStyles}
                    onMouseEnter={(e) => {
                        e.target.style.color = navLinkHoverStyles.color;
                        e.target.style.transform = navLinkHoverStyles.transform;
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = navLinkStyles.color;
                        e.target.style.transform = "scale(1)";
                    }}
                    >
                  Contact Us
                </Link>
                <Link
                    className='nav-link nav-link-custom'
                    to="/aboutus"
                    style={navLinkStyles}
                    onMouseEnter={(e) => {
                        e.target.style.color = navLinkHoverStyles.color;
                        e.target.style.transform = navLinkHoverStyles.transform;
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.color = navLinkStyles.color;
                        e.target.style.transform = "scale(1)";
                    }}
                    >
                  About Us
                </Link>
                {user ? (
                  <div className='' style={{color:"white",padding:"0px"}}>
                    {/* <img className='loggedInImage' src={profile} style={{borderRadius:"100%",height:"30px",width:"40px"}}/> */}
                
                  <Dropdown  isOpen={dropdownOpen}  toggle={toggle} direction={direction}>
        <DropdownToggle color='none' caret><img

        style={{padding:"0px",borderRadius:"100%",border:"none",height:"40px"}}
        src={user?user.profile:profile}
        alt="Profile"
        
      /></DropdownToggle>
        <DropdownMenu {...args}>
          <DropdownItem header>{user?user.username:"NONE"}</DropdownItem>
          <Link  to="/editProfile"><DropdownItem>Edit Profile</DropdownItem></Link>
          <DropdownItem onClick={handleLogOut}>LogOut</DropdownItem>
         
        </DropdownMenu>
      </Dropdown>
                </div>
                ) : (
                  <div className='nav-link' style={{ textDecoration: 'none' }}>
                    <Link className='text-light' to="/login">
                      Login /
                    </Link>
                    <Link className=' text-light ms-1 ' to="/signup">
                      SignUp
                    </Link>
                  </div>
                )}
                
              </Nav>
            </Navbar.Collapse>
            </div>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default MainNavbar;