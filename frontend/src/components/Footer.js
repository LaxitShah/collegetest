
import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import '../CSS/footer.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
    return (
        <MDBFooter  style={{backgroundColor:"#20262E"}} className='block text-center  text-lg-start text-muted'>

            <section className=''>
                <div className='container text-center text-md-start '>
                    <div className='row '>
                        <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                            <h6 className='text-uppercase  fw-bold '>
                                <i className='fas fa-gem me-3'></i>     
                                                       
                                <img style={{marginTop: '60px'}} height={100} width={180} src='https://res.cloudinary.com/dofftzsmf/image/upload/v1685876348/CollegeWeb_logo/finalNoBG_g6pin3.png'
                        />
                            </h6>
                            <p className='text-light' style={{color:'red',marginTop:'10px',marginLeft:'10px',fontFamily: " 'Tahoma','sans-serif'",fontStyle:'initial'}}>
                            The Ultimate Wingman for Your Higher Education Journey.
                            </p>
                        </div>

                        <div className='mt-4 col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                            <h6 className=' text-uppercase fw-bold mb-4 text-light'>Explore</h6>
                            <p>
                                <Link to='/' className='text-light footer-link '>
                                    Home
                                </Link>
                            </p>
                            <p>
                                <Link to='/colleges' className='text-light footer-link'>
                                    Colleges
                                </Link>
                            </p>
                            <p>
                                <Link to='/contactus' className='text-light footer-link'>
                                    Contact Us
                                </Link>
                            </p>
                            <p>
                                <Link to='/aboutus' className='text-light footer-link'>
                                    About Us
                                </Link>
                            </p>
                        </div>

                       

                        <div className='mt-4 text-light col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'
                        >
                            {/* change the marginLeft to reactstrap */}
                            <h6 style={{marginLeft:'20px'}} className='text-uppercase fw-bold mb-4 text-light' >Email Us </h6>
                            <i className='fas fa-envelope me-3 text-light' style={{marginLeft:'5px'}}></i>
                                collegeweb@gmail.com
                                <div class="container pt-4 pb-2" style={{textAlign:'left'}}>
                                <div className="connect-container">
                                <h6 className='text-uppercase fw-bold mb-4 text-light' style={{marginTop:'5px',marginRight:'20px'}}>Connect Us </h6>
                                <div className="social-icons-container">
                                
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="social-icon text-white ml-0 mr-2 " size="2em" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="social-icon text-white mx-2" size="2em" />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="social-icon text-white mx-2" size="2em" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="social-icon text-white mx-2" size="2em" />
                            </a>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='text-center p-4 bg-grey' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright:
                <a className='text-reset fw-bold' href='/'>
                    CollegeWeb.com
                </a>
            </div>
        </MDBFooter>
    );
}

export default Footer;