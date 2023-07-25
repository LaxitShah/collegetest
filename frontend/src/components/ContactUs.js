import React, { useState } from 'react';
import '../CSS/contact.css';
import axios from 'axios';
import { url } from './MainComponent';
import { Button, Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { ModalHeader } from 'reactstrap';

const Contact = () => {

  const [modalOpen, setModalOpen] = useState({isOpen:false,message:"none"});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    const target=e.target;
    axios.post(`${url}users/sendMail`,{name:target.name.value,
    mail:target.email.value,Decription:target.message.value})
    .then((res)=>{
      setModalOpen({isOpen:true,message:"Message sent successfully!"});
    })
    .catch((err)=>{
      setModalOpen({isOpen:true,message:"can't send mail because of some error!"});

    })
    // Implement your form submission logic here
  };

  return (
    <div className="contact-container">
    <div className="contact-form-container">
    {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}> */}
    <h4 style={{ marginBottom: "170px", fontSize: "20px", marginRight: "40px", display: "flex", alignItems: "center" }}>
    <img src="https://res.cloudinary.com/dofftzsmf/image/upload/v1689504868/icons8-phone-50_p9iogk.png" width={"32px"} alt="hello" />
      <span style={{ marginLeft: "10px" }}>1800-1901-0001</span>
      <p style={{marginTop:"140px",position:"absolute",marginLeft:"3px"}}>
      <img src="https://res.cloudinary.com/dofftzsmf/image/upload/v1689505848/icons8-mail-50_qcqybq.png" width={"22px"} alt="hello" />
      <span style={{ marginLeft: "10px" }}>collegeweb@gmail.com</span>
      </p>
      <p style={{marginTop:"270px",position:"absolute",marginLeft:"3px"}}>
      <img src="https://res.cloudinary.com/dofftzsmf/image/upload/v1689506044/icons8-address-50_ylruej.png" width={"22px"} alt="hello" />
      <span style={{ marginLeft: "10px" }}>DAIICT,Gandhinagar</span>
      </p>
    </h4>
    <div></div>
    {/* <h4 style={{ marginBottom: "520px", fontSize: "20px", marginRight: "40px"}}> */}

    {/* </h4> */}
    {/* </div> */}
        <div className="contact-details">

          {/* <h1>Contact</h1> */}
          {/* <p className="contact-description" style={{position:"",marginTop:"0px",marginRight:"50px",display:""}}>Fill  the form  to contact</p> */}
          {/* <div className="contact-info">
            <button className="contact-button">
              <span className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone">
                  <path d="M3 3L21 21"></path>
                </svg>
              </span>
              +91-988888888
            </button>
            <button className="contact-button">
              <span className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail">
                  <path d="M22 5.6L12 13L2 5.6"></path>
                </svg>
              </span>
              hello@abc.com
            </button>
            <button className="contact-button">
              <span className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin">
                  <path d="M21 10.5C21 18 12 23 12 23C12 23 3 18 3 10.5C3 9.12 3.84 7.88 5.24 7.22M12 22V11"></path>
                </svg>
              </span>
              Ahmedabad , India
            </button>
          </div> */}
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <h2>Get in Touch</h2>
            <div className="form-group">
              <input type="text" placeholder='Enter your name' style={{width:"350px"}} id="name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder='Enter your email' id="email" style={{width:"350px"}} required />
            </div>
            <div className="form-group">
  
              <textarea rows={8} style={{width:"350px"}} id="message" placeholder='Enter your message...' required></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    
      <Modal show={modalOpen.isOpen} toggle={() => setModalOpen({isOpen:!modalOpen,message:modalOpen.message})}>
        <ModalHeader >Success</ModalHeader>
        <ModalBody>
          {modalOpen.message}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setModalOpen({isOpen:!modalOpen,message:"none"})}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Contact;
