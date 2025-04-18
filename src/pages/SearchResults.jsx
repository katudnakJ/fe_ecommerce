import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, Link} from 'react-router-dom';
import { Container, Row, Col, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import TopNav from '../components/TopNav';
import TopMenu from '../components/TopMenu';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const placeholderImage = '../assets/images/furniture_temp.png';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null); // ใช้สำหรับเก็บข้อผิดพลาด

  const [order, setOrder] = useState('Order by');
  var sendorder = (order === 'Price: High to Low') ? 'DESC' : (order === 'Price: Low to High') ? 'ASC' : '';


  const searchQuery = searchParams.get('q');

  // ฟังก์ชันดึงข้อมูลสินค้าจาก API
  const fetchProducts = (query,order) => {
    if (query || order) {
      axios
        .get(`/api/v1/products?search=${query}&order=${order}`)
        .then((response) => {
          if (response.data.items) {
            setProducts(response.data.items); // ตั้งค่า products ด้วยข้อมูลจาก API
            setError(null); // ล้าง error หากมีข้อมูล
          } else if (response.data.error) {
            setError(response.data.error); // เก็บข้อความข้อผิดพลาด
            setProducts([]); // ล้างรายการ products
          }
        })
        .catch((error) => {
          console.error('Error fetching the products:', error);
          setError('ไม่สามารถดึงข้อมูลสินค้ามาได้'); // เก็บข้อความข้อผิดพลาด
        });
    } else {
      setProducts([]);
    }
  };



  useEffect(() => {
    fetchProducts(searchQuery,sendorder);
  }, [searchQuery,sendorder]);



  // },[])
  return (
    <div>
      <TopNav />
      <TopMenu />
      <Container className="my-5">
  <h3 className="text mb-4">นี่คือผลการค้นหาสำหรับ "{searchQuery}"</h3> 
  <DropdownButton id="dropdown-basic-button" title={order} style={{marginBottom:'100px'}}>
<Dropdown.Item 
value="Order by"
onClick={(s)=> setOrder("Order by")} >
  Order by
</Dropdown.Item>

  <Dropdown.Item 
  onClick={()=> setOrder("Price: Low to High")}>
    Price: Low to High
  </Dropdown.Item>

  <Dropdown.Item
  value="High to Low"
  onClick={()=> setOrder("Price: High to Low")}>
  Price: High to Low</Dropdown.Item>
</DropdownButton>


  <Row className="justify-content-center">
  {error ? (
            <p className="text-center">{error}</p> // แสดงข้อความข้อผิดพลาด
          ) : products.length > 0 ? (
            products.map((product) => {
              const primaryImage = product.Prod_Image 
              ? product.Prod_Image
              : placeholderImage;
             

      return (
        <Col key={product.Prod_ID} >
                  <Link to={`/products/${product.Prod_ID}`} style={{textDecorationLine:'none'}}>
          <Card className="mb-4" style={{ width: '300px', height: '340px', margin: 'auto' }}>
            <Card.Img
              variant="top"
              src={primaryImage}
              alt={product.Prod_Name}
              style={{ width: '200px', height: '100px', margin: '25px auto' }}
            />
            <Card.Body>
              <Card.Title style={{ textAlign: 'center' }}>{product.Prod_Name}</Card.Title>
              <Card.Text>Brand: {product.Brand_Name}</Card.Text>
              <Card.Text>Sold: {product.Sales_Amount}</Card.Text>
              <div className="rating">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span style={{ fontSize: '15px', color: '#333', marginLeft: '10px' }}>4.9</span>
                </div>
              <Card.Text style={{ textAlign: 'right', fontSize: '20px', color: '#dc0202' }}>
                {product.Prod_Price.toLocaleString('en-US', { style: 'currency', currency: 'THB' })}
              </Card.Text>
            </Card.Body>
          </Card> 
           </Link>
        </Col>
      
      );
    })
  ) : (
    <p className="text-center">ไม่พบสินค้าที่ค้นหา</p>
  )}
  </Row>
</Container>  
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default SearchResults;