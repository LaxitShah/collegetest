import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import CreateCollege from './CreateCollege';

const BlogPost2= ({ isAdmin, User, setUser }) => {
  const isUser = User !== undefined && User !== null && User !== '';
  const posts = [
    {
      title: "Explore Your Future: Discover Colleges on CollegeWeb",
      description: " Welcome to the Explore College page on CollegeWeb, where your journey towards finding the perfect college begins. Here, you can dive into a world of opportunities and possibilities as you explore a wide array of colleges tailored to your preferences and aspirations. Whether you're seeking a bustling urban campus, a serene rural retreat, or a vibrant community known for its academic excellence, CollegeWeb has you covered. Start your exploration today and pave the way for an exciting future.Delve into the wealth of information available in our detailed college profiles. Each college on CollegeWeb has a dedicated profile that offers comprehensive insights into its academic programs, campus culture, admissions requirements, tuition and fees, and student life. From renowned faculty and cutting-edge facilities to unique extracurricular opportunities and campus resources, our profiles provide a holistic view of what each college has to offer. Discover your dream college and make an informed decision that aligns with your goals and aspirations",
      image: 'https://res.cloudinary.com/dofftzsmf/image/upload/v1687699379/198342273_l_normal_none_b9jx80.jpg',
    },
    {
      title: '  Real Experiences, Reviews: Hear from Students Like You',
      description: "At CollegeWeb, we value the power of student perspectives. In this section, you'll find authentic reviews from students who have experienced life at various colleges firsthand. Gain valuable insights into academics, campus life, extracurricular activities, and more, as students share their personal experiences and reflections. These reviews, based on factors such as academics, campus community, and extracurricular opportunities, can help you form a well-rounded understanding of the colleges you're considering. Get a glimpse into student life and make an informed choice that suits your preferences and goals.CollegeWeb transcends geographical boundaries, allowing you to expand your horizons and explore colleges from around the globe. Whether you prefer to study in your hometown or immerse yourself in a new culture, our platform offers an extensive range of colleges in various locations.",
      image: 'https://res.cloudinary.com/dofftzsmf/image/upload/v1687699379/198638766_l_normal_none_inyncw.jpg',
    },
  ];

  return (
    <div style={{backgroundColor:"#ececec",marginBottom: "-45px"}}>
      {posts.map((post, index) => (
        <Row
          key={index}
          className={`align-items-center ${
            index % 2 === 1 ? 'flex-row-reverse' : ''
          } mb-5`}
        >
          {index === 0 &&<Col md={5}>
            <Card.Img src={post.image} alt={post.title} style={{ width: "600px",height:"500px",marginLeft:"30px",marginTop:"20px" }} />
          </Col>}
          {index === 1 &&<Col md={6}>
            <Card.Img src={post.image} alt={post.title}  />
          </Col>}
          
          <Col md={6}>
            <div style={{ textAlign: "center",marginTop:"10px" }}>
              <h2 style={{ fontSize: "23px", fontWeight: "bolder", fontFamily: "cursive" }}>{post.title}</h2>
            </div>
            <div style={{ marginLeft: "70px", fontFamily: "cursive", textAlign: "left" }}>
              <p style={{ marginTop: "40px", fontSize: "18px" }}>{post.description}</p>
            </div>
         
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default BlogPost2;
