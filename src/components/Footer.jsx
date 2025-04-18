// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhone, FaEnvelope,FaFacebook, FaInstagram, FaLine  } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-4 " style={{backgroundColor:"#ae9371", color:"white"}}>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={4}>
            <h5>FurnitureMall</h5>
            <p>เติมเต็มความสุขให้ทุกห้อง ด้วยเฟอร์นิเจอร์คุณภาพที่ Furniture Mall จัดสรรไว้สำหรับบ้านที่คุณรัก</p>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
            {/* import { FaPhone, FaEnvelope } from 'react-icons/fa'; */}
            <FaEnvelope /> <a href="mailto:furnituremall@gmail.com" style={{textDecoration:"none", color:"inherit"}} className="text-white">furnituremall@gmail.com</a>
            <li><FaPhone /> +66 86*******</li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><FaFacebook /> <Link to={"https://example.com"} style={{textDecoration:"none", color:"inherit"}}> Facebook </Link></li>
              <li><FaInstagram /><Link to={"https://example.com"} style={{textDecoration:"none", color:"inherit"}}> Instagram</Link></li>
              <li><FaLine /><Link to={"https://example.com"} style={{textDecoration:"none", color:"inherit"}}> Line</Link></li>
              
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
