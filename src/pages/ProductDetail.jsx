
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TopNav from '../components/TopNav';
import TopMenu from '../components/TopMenu';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


const ProductDetail = () => {
const { id } = useParams(); // Get id from URL params
  const { cust_id } = useParams();
  const [products, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const placeholderImage = '../assets/images/placeholder.jpg';
  
  const fetchProductDetails = (id) => {
    axios
      .get(`/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  };

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (!products) {
    return <div>Loading...</div>; // แสดง Loading ระหว่างดึงข้อมูล
  }


  //Q
  const handleAddToCart = async () => {
    try {
      // ส่งข้อมูลการเพิ่มสินค้าในรถเข็นผ่าน API
      const response = await axios.post(`http://localhost:8085/api/v1/Cart/${cust_id}/${id}`, { // เลข 1 คือ user_id
        productId: products.prod_id,
        quantity: quantity,
      });

      console.log(`Added ${quantity} of product ${products.prod_id} to cart`);
      // ถ้าคำขอสำเร็จ สามารถจัดการกับข้อมูลใน response ที่ได้รับ เช่น แสดงข้อความหรืออัพเดท UI
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div>
      <TopNav />
      <TopMenu />
      <Container className="my-5">
        <Row>
          <Col md={6}>
            {/* แสดงรูปภาพสินค้า */}
            <Card.Img
              variant="top"
              src={products.Prod_Image || placeholderImage}
              alt={products.Prod_Name}
              style={{margin: '10px auto'}}

              onError={(e) => {
                e.target.onerror = null; // ป้องกันการเรียก onError ซ้ำ
                e.target.src = placeholderImage; // เปลี่ยนไปใช้รูปภาพสำรอง
              }} 
            />

          </Col>
          <Col md={6}>
            <h2>{products.Prod_Name}</h2>
            <p style={{ fontSize: '30px', fontWeight: 'regular' }}>
              ฿ <strong></strong> {products.Prod_Price}
            </p>

            <p style={{ fontSize: '18px' }}><strong>Details:</strong> {products.Prod_Details || 'รายละเอียดไม่ระบุ'}</p>
            <p style={{ fontSize: '18px' }}><strong>Brand:</strong> {products.Brand_Name || 'รายละเอียดไม่ระบุ'}</p>
            <p style={{ fontSize: '18px' }}><strong>Stock:</strong> {products.Stock}</p>
            <p style={{ fontSize: '18px' }}><strong>Update:</strong> {formatDate(products.Updated_At)}</p>
            <br /><div className='quantity' style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <Button variant="outline-secondary" onClick={handleDecrease} disabled={quantity <= 1}>-</Button>
              <span style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '10px', marginLeft: '10px' }}>{quantity}</span>
              <Button variant="outline-secondary" onClick={handleIncrease}>+</Button>
            </div><br />
            <Button variant="primary" style={{ fontSize: '18px' }} onClick={handleAddToCart} >เพิ่มในรถเข็น</Button>
          </Col>
        </Row>


        {/* ข้อมูลผู้ขาย */}
        <Row className="align-items-center mt-4" style={{
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}>
          <Col md={2} className="d-flex justify-content-center">
            <img
              src={products.Shop_Image || placeholderImage}
              alt={products.Shop_Name}
              style={{
                maxHeight: '85px',
                maxWidth: '85px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '1px solid #ccc'
              }}

              onError={(e) => {
                e.target.onerror = null; // ป้องกันการเรียก onError ซ้ำ
                e.target.src = placeholderImage; // เปลี่ยนไปใช้รูปภาพสำรอง
              }} 
            />
          </Col>
          <Col md={6}>
            <>
              <div className="info">
                <h5>{products.Shop_Name}</h5>
                <div className="rating">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span style={{ fontSize: '15px', color: '#333', marginLeft: '10px' }}>4.9</span>
                </div>
              </div>
            </>
          </Col>
          <Col md={4} className="d-flex justify-content-end">
            <Button link={Link} href={`/store/${products.Shop_ID}`} variant="secondary" style={{ fontSize: '16px', backgroundColor: '#B08D68', color: '#fff' }}>
              ดูร้านค้า
            </Button>
          </Col>
        </Row>

      </Container>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default ProductDetail;