import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import CreateCollege from './CreateCollege';

const BlogPost = ({ isAdmin, User, setUser }) => {
  
  const posts = [
    {
      title: "Create Your College's Digital Presence with Ease",
      description: "With CollegeWeb, colleges can effortlessly establish their own customized digital presence. Our intuitive website creation tool empowers institutions to showcase their unique campus culture, academic programs, faculty, and student life. Utilize our range of templates and customization options to design a visually captivating website that reflects your college's brand identity. Stay connected with students, alumni, and the wider community by sharing engaging content, multimedia resources, and real-time updates. Join our growing community of colleges and experience a new way of connecting, communicating, and sharing information. From important notices and campus news to showcasing student achievements and events, CollegeWeb is the ultimate hub for fostering connections within the college ecosystem.",
      image: 'https://res.cloudinary.com/dofftzsmf/image/upload/v1684659695/pang-yuhao-_kd5cxwZOK4-unsplash_trbn4x.jpg',
    },
    {
      title: 'Discover Colleges, Follow Your Favorites, and Stay Informed',
      description: "CollegeWeb is not only a platform for colleges, but also a treasure trove for students seeking information and insights about higher education institutions. Explore an extensive database of colleges, browse detailed profiles, and make informed decisions about your educational journey. Follow your favorite colleges to stay updated on their latest news, events, admissions requirements, and more. Discover the unique features, vibrant communities, and academic offerings that make each college special. It's a thriving social space where students can interact, engage, and forge connections with peers from various colleges. Like and comment on college posts, participate in discussions, and share your experiences with others. From academic queries to extracurricular interests, CollegeWeb encourages meaningful conversations, collaboration, and the exchange of ideas among students across different campuses.",
      image: 'https://res.cloudinary.com/dofftzsmf/image/upload/v1687114040/marvin-meyer-SYTO3xs06fU-unsplash_lajo2o.jpg',
    },
  ];

  return (

  // <ScrollToTop>
  <div style={{backgroundColor:"#ececec",marginBottom: "-45px"}}>

      {posts.map((post, index) => (
        <Row
          key={index}
          className={`align-items-center ${
            index % 2 === 1 ? 'flex-row-reverse' : ''
          } mb-5`}
        >
          <Col md={6}>
            <Card.Img src={post.image} alt={post.title} />
          </Col>
          <Col md={6}>
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "23px", fontWeight: "bolder", fontFamily: "cursive" }}>{post.title}</h2>
            </div>
            <div style={{ marginLeft: "30px", fontFamily: "cursive", textAlign: "left" }}>
              <p style={{ marginTop: "40px", fontSize: "18px" }}>{post.description}</p>
            </div>
            {index === 0 && (
               <div style={{ marginTop: "20px", marginLeft: "30px" }}>
              <CreateCollege isUser={User?true:false} setUser={setUser} />
              </div>
            )}
          </Col>
        </Row>
      ))}
    </div>
    // </ScrollToTop>
  );
};

export default BlogPost
