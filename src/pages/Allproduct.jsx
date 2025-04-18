import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import '../css/Allproduct.css';
import TopNav from "../components/TopNav";
import TopMenu from "../components/TopMenu";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
// import { Container, Row, Col, Card, Form } from "react-bootstrap";

const Allproduct = () => {
    // State Management
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        Room: '',
        productType: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'default',
        Date: 'default'
    });

    const placeholderImage = '../assets/images/furniture_temp.png';

    // const primaryImage = products.Prod_Image ? products.Prod_Image : placeholderImage;

    useEffect(() => {
        fetchProducts(filters.Room, filters.productType);
    }, [filters.Room, filters.productType]);

    const fetchProducts = async (room, productType) => {
        try {
            setLoading(true);

            // สร้าง URL โดยพิจารณาตามค่าของ room และ productType
            let url = '/api/v1/products/GetAllProducts';

            if (room && productType) {
                url = `/api/v1/products/GetProductByCategoryRoom&Fur/${room}/${productType}`;
            } else if (room) {
                url = `/api/v1/products/GetProductByCategoryRoom/${room}`;
            } else if (productType) {
                url = `/api/v1/products/GetProductByCategoryFurniture/${productType}`;
            }

            // เรียก API ด้วย URL ที่สร้างขึ้น
            const response = await axios.get(url);

            // ตั้งค่า products และ filteredProducts หากมีข้อมูล หรือเป็นอาร์เรย์ว่างหากไม่มีข้อมูล
            setProducts(response.data || []);
            setFilteredProducts(response.data || []);

        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการเรียกข้อมูลผลิตภัณฑ์:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = useCallback(() => {
        let filtered = [...products];

        if (filters.minPrice) {
            filtered = filtered.filter(product => product.Prod_Price >= Number(filters.minPrice));
        }

        if (filters.maxPrice) {
            filtered = filtered.filter(product => product.Prod_Price <= Number(filters.maxPrice));
        }

        switch (filters.sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.Prod_Price - b.Prod_Price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.Prod_Price - a.Prod_Price);
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
    }, [products, filters.minPrice, filters.maxPrice, filters.sortBy]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    // ปรับฟังก์ชัน handleFilterChange ให้รับการกรองใหม่
    const handleFilterChange = (type, value) => {
        const newFilters = { ...filters, [type]: value };
        setFilters(newFilters);
    };

    return (
        <div>
            <TopNav />
            <TopMenu />
            <div className="container">
                <div className="content-wrapper">
                    <div className="sidebar">
                        <div className="filter-card">
                            <h2 className="filter-title">Category / Filter</h2>
                            <div className="filter-section">
                                <h3 className="filter-subtitle">Room</h3>
                                <select value={filters.Room} onChange={e => handleFilterChange('Room', e.target.value)}
                                    className="filter-select">
                                    <option value="">All Room</option>
                                    <option value="Livingroom">Living Room</option>
                                    <option value="Bedroom">Bed Room</option>
                                    <option value="Bathroom">Bath Room</option>
                                    <option value="Kitchen">Kitchen</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>

                            <div className="filter-secction">
                                <h3 className="filter-subtitle">Product</h3>
                                <select value={filters.productType} onChange={(e => handleFilterChange('productType', e.target.value))}
                                    className='filter-select' >
                                    <option value="">All Product</option>
                                    <option value="Sofa">Sofa</option>
                                    <option value="Bed">Bed</option>
                                    <option value="Bath">Bath</option>
                                    <option value="Sink">Sink</option>
                                    <option value="Chair">Chair</option>
                                    <option value="Table">Table</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="main-content">
                        <div className="top-bar">
                            <h1 className="page-title">
                                All Product <span className='product-count'>({filteredProducts.length} products found)</span>
                            </h1>
                            <div className="filter-controls">
                                <div className="price-range">
                                    <input
                                        type="number"
                                        placeholder='Min'
                                        className='price-input'
                                        value={filters.minPrice}
                                        onChange={(e => handleFilterChange('minPrice', e.target.value))} />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        placeholder='Max'
                                        className='price-input'
                                        value={filters.maxPrice}
                                        onChange={(e => handleFilterChange('maxPrice', e.target.value))} />
                                </div>

                                <select
                                    value={filters.sortBy}
                                    onChange={(e => handleFilterChange('sortBy', e.target.value))}
                                    className='sort-select'>
                                    <option value="default">Sort by</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {error ? (
                            <div className="error">Error: {error}</div>
                        ) : loading ? (
                            <div className="loading">Loading...</div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="product-grid">
                                {filteredProducts.map((product) => (
                                    <Link to={`/products/${product.Prod_ID}`} style={{textDecorationLine: 'none'}}>
                                    <div key={product.Prod_ID} className="product-card">
                                        <img
                                            src={product.Prod_Image || placeholderImage}
                                            alt={product.Prod_Name}
                                            className='product-image'
                                            style={{ width: '200px', height: '100px', margin: '25px auto' }}
                                        />
                                        <div className='product-details'>
                                            <h3 className="product-name">{product.Prod_Name}</h3>
                                            <p className='product-brand'>{product.Brand_Name}</p>
                                            <div className="rating" >
                                                <span>⭐</span>
                                                <span>⭐</span>
                                                <span>⭐</span>
                                                <span>⭐</span>
                                                <span>⭐</span>
                                                <span style={{ fontSize: '15px', color: '#333', marginLeft: '10px' }}>4.9</span>
                                            </div>
                                            <div className="product-price">
                                                <span>{product.Prod_Price.toLocaleString('en-US', { style: 'currency', currency: 'THB' })} ฿</span>
                                                {/* THB */}
                                            </div>
                                        </div>
                                    </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center">ไม่พบสินค้าที่ค้นหา</p>
                        )}
                    </div>
                </div>
            </div>
            <ScrollToTop />
            <Footer />
        </div>
    );
};

export default Allproduct;