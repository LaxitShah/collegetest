import React from 'react';
import '../CSS/about.css';
import Footer from './Footer';


const AboutUs = () => {
  return (
    <>
    <div className="about-us-container">
      <div className="banner-container">
        <img
          className="banner-image"
          src="https://res.cloudinary.com/dofftzsmf/image/upload/v1689841536/about-bg_hf34y3.jpg"
          alt="College Banner"
        />
        <div className="banner-overlay"></div>
        <div className="banner-title">
          <h1>About Us</h1>
        </div>
      </div>

      <div className="content-container">
            <div className="left-content">
                <h1 className="welcome-title">Welcome to Our College</h1>
          <p className="about-us-desc">
          At CollegeWeb, we are more than just a website; we are a comprehensive platform dedicated to empowering students on their educational journey. Established with a vision to revolutionize the way students explore, choose, and succeed in higher education, CollegeWeb is your trusted companion in shaping a bright and promising future.
          </p>
          <p>
          At CollegeWeb, we understand that choosing the right college or university is one of the most critical decisions a student will make. With a vast array of educational institutions and programs to choose from, it can often be overwhelming and confusing. That's why we are committed to simplifying the process and providing students with accurate, up-to-date, and unbiased information.
          </p>
        </div>
        <div className="right-content">
          {/* Replace 'image2.jpg' with the URL or path to your second image */}
          <img
            className="right-image"
            src="https://res.cloudinary.com/dofftzsmf/image/upload/v1689850141/college-student-gaa2509696_1920_f3jbq4.jpg"
            alt="College Image"
          />
        </div>
        </div>

        <></>
        <blockquote className="motivating-quote">
            "The future belongs to those who believe in the beauty of their dreams."
          </blockquote>
          <div className="founder-cards">
            <div className="founder-card">
              <img className="founder-image" src="https://res.cloudinary.com/dofftzsmf/image/upload/v1690025730/Founders/IMG_20230124_004713_pnn75e.jpg" alt="Founder 1" />
              <div className="founder-details">
                <h3>Arkan Mansuri</h3>
                <p>
                    Founder of CollegeWeb,Full Stack Developer
                 </p>
                 <div className="founder-links">
                  <a href="https://github.com/202212055Arkan/" target="_blank" rel="noopener noreferrer">
                    <img src="https://res.cloudinary.com/dofftzsmf/image/upload/v1689859325/icons8-github-30_cd8zke.png" alt="GitHub" />
                  </a>
                  <a href="https://www.linkedin.com/in/arkan-mansuri/" target="_blank" rel="noopener noreferrer">
                    <img src="https://res.cloudinary.com/dofftzsmf/image/upload/v1689859325/icons8-linkedin-48_ttfzlh.png" alt="LinkedIn" width={"30px"} height={"30px"} />
                  </a>
                </div>
              </div>
            </div>
            <div className="founder-card">
              <img className="founder-image" src="https://res.cloudinary.com/dofftzsmf/image/upload/v1689857024/co-founder1_ksr86d.jpg" alt="Founder 2" />
              <div className="founder-details">
                <h3>Laxit Shah</h3>
                <p>
                Tech Enthusiast & Frontend Developer
                </p>
                <div className="founder-links">
                  <a href="https://github.com/LaxitShah/" target="_blank" rel="noopener noreferrer">
                    <img src="https://res.cloudinary.com/dofftzsmf/image/upload/v1689859325/icons8-github-30_cd8zke.png" alt="GitHub" />
                  </a>
                  <a href="https://www.linkedin.com/in/laxitshah/" target="_blank" rel="noopener noreferrer">
                    <img src="https://res.cloudinary.com/dofftzsmf/image/upload/v1689859325/icons8-linkedin-48_ttfzlh.png " width={"30px"} height={"30px"} alt="LinkedIn" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        {/* </div> */}
        <div className="right-content">
          {/* The right image or content that was present earlier */}
        </div>

    </div>
        <Footer/>
       </>
  );
};

export default AboutUs;
