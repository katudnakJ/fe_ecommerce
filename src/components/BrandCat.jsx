import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';


const BrandCat = () => {
    const [Brands, setBrand] = useState([]);

    // ใช้ URL ของรูปภาพ placeholder แทนการ import
    const placeholderImage = '../assets/images/placeholder.png';

    useEffect(()=>{
        axios   
            .get("/api/v1/products/brand")
            .then((response) =>{
                setBrand(response.data)
        })

    },[]);
    return (
        <Container className="my-5">
        <h2 className="text-center mb-4">Brand</h2>
        <Row>
          {Brands.length > 0 ? (
            Brands.map((brand) => {
              // ใช้รูปภาพหลัก ถ้าไม่มีให้ใช้ placeholderImage
              var primaryImage;

              if (brand.Brand_Image == null || brand.Brand_Image === '') {
                  primaryImage = placeholderImage;
              } else {
                  primaryImage = brand.Brand_Image; // ใช้ Brand_Image โดยตรง
              }
  
              return (
                <Col md={2} key={brand.Brand_ID} style={{ margin: '0 auto', marginTop: '20px' }} >
                  <Card className="mb-4" style={{ width: '150px', height: 'auto' ,margin: '0 auto', border: 'none' }}>
                    {/* ใช้ onError เพื่อตรวจสอบว่ารูปภาพโหลดไม่สำเร็จหรือไม่ */}
                    <Card.Img 
                      variant="top" 
                      src={primaryImage} 
                      
                      alt={brand.Brand_Name} 
                      style={{ width: '100px', height: '100px',margin: '0 auto' }}
                       
                    />
                    <Card.Body>
                      <Card.Title style={{ textAlign : 'center' }}>{brand.Brand_Name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p className="text-center">ไม่พบ brand</p>
          )}
        </Row>
      </Container>
    );
};

export default BrandCat;