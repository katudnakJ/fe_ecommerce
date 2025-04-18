import '../css/store.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TopNav from '../components/TopNav';
import TopMenu from '../components/TopMenu';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Store = () => {
  const navigate = useNavigate();
  const [latestProducts, setLatestProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const {store_id} = useParams();

  useEffect(() => {
    // Fetch latest products by shop ID
    axios.get(`/api/v1/products/shop/${store_id}/latest`)
      .then(response => {
        setLatestProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching latest products:', error);
      });

    // Fetch all products by shop ID
    axios.get(`/api/v1/products/shop/${store_id}`)
      .then(response => {
        setAllProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching all products:', error);
      });

    // Fetch shop information
    axios.get(`/api/v1/shops/info/${store_id}`)
      .then(response => {
        setShops(response.data);
      })
      .catch(error => {
        console.error('Error fetching shop information:', error);
      });
  }, [store_id]);

  const formatPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) {
      return '0 THB';
    }
    return `${numPrice.toLocaleString()} THB`;
  };

  const ProductItem = ({ product }) => (
    <div className="product-item" onClick={() => navigate(`/products/${product.Prod_ID}`)}>
      <img src={product.Prod_Image} alt={product.Prod_Name} width="200" height="150" />
      <div className="product-info">
        <h2>{product.Prod_Name}</h2>
        <div className="rating">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span style={{ fontSize: '15px', color: '#333', marginLeft: '10px' }}>4.9</span>
                </div>
        <div className="price">
          {formatPrice(product.Prod_Price)}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <TopNav />
      <TopMenu />
      
      <div className="header">
        {shops.length > 0 && shops.map((shop, index) => (
          <div key={index}>
            <img src={shop.Shop_Image} alt={shop.Shop_Image} width="50" height="50" />
            <div className="info">
              <h1>{shop.Shop_Name}</h1>
              <div className="rating">
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span>⭐</span>
                <span style={{ fontSize: '15px', color: '#333', marginLeft: '10px' }}>4.9</span>
              </div>
            </div>
          </div>
        ))}
        <button className="follow-btn">ติดตามร้านค้า +</button>
      </div>

      <div className="content-container">
        <div className="content-wrapper">
          <div className="section-title">สินค้ามาใหม่</div>
          <div className="product-list">
            {latestProducts && latestProducts.map(product => (
              <ProductItem key={product.Prod_ID} product={product} />
            ))}
          </div>

          <div className="section-title">สินค้าทั้งหมด</div>
          <div className="product-list">
            {allProducts.map(product => (
              <ProductItem key={product.Prod_ID} product={product} />
            ))}
          </div>
        </div>
      </div>
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Store;
