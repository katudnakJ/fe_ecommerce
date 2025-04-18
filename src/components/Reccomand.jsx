import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col,Carousel} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NewProducts = () => {
  const [products, setProducts] = useState([]);

  // ใช้ URL ของรูปภาพ placeholder แทนการ import
  const placeholderImage = '../assets/images/furniture_temp.png';

    // จัดกลุ่มสินค้าเป็นชุด ๆ ละ 3
    const groupedProducts = [];
    if (products !=null && products.length > 0){
    for (let i = 0; i < products.length; i += 3) {
      groupedProducts.push(products.slice(i, i + 3));
    }
  }

  useEffect(() => {
    axios
      .get('/api/v1/products/rec')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the products:', error);
      });
  }, []);
if (products !=null && products.length > 0){
  return (
    <Container className="my-5">
      <h2 className="text mb-4">Reccomand for You</h2>
      <Carousel interval={null} controls={true} indicators={true} pause="hover">
        {groupedProducts.map((productGroup, index) => (
          <Carousel.Item key={index}>
            <Row className="justify-content-center">
              {productGroup.map((product) => {
                const primaryImage = product.Prod_Image ?
                 product.Prod_Image 
                : placeholderImage;
            

                return (
                  <Col md={4} key={product.Prod_ID}>
                    <Link to={`/products/${product.Prod_ID}`} style={{textDecorationLine: 'none'}}>
                    <Card className="mb-4" style={{ width: '300px', height: '340px', margin: 'auto' }}>
                      <Card.Img
                        variant="top"
                        src={primaryImage}
                        alt={product.Prod_Name}
                        style={{ width: '100px', height: '100px', margin: '25px auto' }}
                      />
                      <Card.Body >
                        <Card.Title style={{ textAlign: 'center' }}>{product.Prod_Name}</Card.Title>
                        <Card.Text>Brand : {product.Brand_Name} </Card.Text>
                        <Card.Text>Sold : {product.Sales_Amount} </Card.Text>
                        {/* <Card.Text>Status : {product.Status_Rec ? 'true' : 'false'}</Card.Text> */}
                        <div className="rating">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span style={{ fontSize: '15px', color: '#333', marginLeft: '10px' }}>4.9</span>
                </div>
                        <Card.Text style={{textAlign: 'Right', fontSize: '20px', color: '#dc0202'}}>{product.Prod_Price.toLocaleString('en-US', { style: 'currency', currency: 'THB' })}   </Card.Text>
                      </Card.Body>
                    </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}else{
  return(
    <p className="text-center">ไม่พบสินค้า</p>
  );
}
};

export default NewProducts;