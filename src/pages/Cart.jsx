import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/Cart.css'; // Import the CSS file for styling
import { useParams } from "react-router-dom";
import TopNav from "../components/TopNav";
import TopMenu from "../components/TopMenu";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

const Cart = () => {
    const { cust_id } = useParams();
    const [cart, setCart] = useState([]); // State for storing cart items
    const [error, setError] = useState(null); // State for handling errors
    const [loading, setLoading] = useState(true); // State for loading state
  
    // Fetch cart data when component mounts
    useEffect(() => {
      setLoading(true);
      axios
        .get(`http://localhost:8085/api/v1/Cart/${cust_id}`) // Fetch cart for the customer ID
        .then((response) => {
          console.log("Response data:", response.data); // Log the entire response to inspect the structure
  
          // Check if cart_items exists and format it correctly
          const formattedCartItems = (response.data.cart_items || []).map(item => ({
            cart_item_id: item.Cart_Item_ID || null, // Handle missing cart_item_id
            prod_name: item.Prod_Name || "Unknown Product", // Default to "Unknown Product" if prod_name is missing
            brand_name: item.brand_name || "Unknown Brand", // Default to "Unknown Brand" if brand_name is missing
            prod_price: item.Prod_Price || 0, // Default to 0 if prod_price is missing
            quantity: item.Quantity || 0, // Default to 0 if quantity is missing
            totalprice: item.TotalPrice || item.prod_price * item.quantity || 0, // Calculate totalprice if missing
            prod_image: item.Prod_Image || "" // Default empty string if prod_image is missing
          }));
  
          setCart(formattedCartItems); // Set the formatted cart items
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching cart details");
          setLoading(false);
          console.error("Error fetching cart details:", error);
        });
    }, [cust_id]); // This hook runs once on mount
  
    // Helper function to safely format numbers
    const formatPrice = (price) => {
      return price ? price.toLocaleString() : "0"; // Default to "0" if price is undefined or null
    };

    const handleBuy = () => {
        if (cart.length === 0) {
          alert("ตะกร้าของคุณว่างเปล่า!");
          return;
        }
      
        // สร้างข้อความสำหรับยืนยันการซื้อทั้งหมด
        const itemNames = cart.map(item => item.prod_name).join(", ");
        const confirmed = window.confirm(`คุณต้องการซื้อสินค้าทั้งหมด: ${itemNames} หรือไม่?`);
      
        if (confirmed) {
          // ถ้าผู้ใช้ยืนยันการซื้อ, แสดงข้อความ "ซื้อสินค้าสำเร็จ"
          alert(`ซื้อสินค้าทั้งหมดสำเร็จ: ${itemNames}`);
          console.log(`สินค้าทั้งหมดถูกซื้อ: ${itemNames}`);
      
          // เพิ่มฟังก์ชันการทำงานที่เกี่ยวข้องกับการซื้อ (เช่นการติดต่อ API หรือการอัปเดตฐานข้อมูล)
        } else {
          console.log("การซื้อถูกยกเลิก");
        }
      };
    
      const handleDelete = (cart_item_id) => {
        // Call the API to delete the item from the cart
        axios
          .delete(`http://localhost:8085/api/v1/CartDELETE/${cust_id}/${cart_item_id}`)
          .then((response) => {
            console.log("Item deleted successfully:", response.data);
            // Remove the item from the cart state
            setCart((prevCart) => prevCart.filter((item) => item.Cart_Item_ID !== cart_item_id));
            // Reload the page after the item is deleted
            window.location.reload(); // This will reload the current page
          })
          .catch((error) => {
            // Display error message with more details
            if (error.response) {
              setError(`Error deleting item: ${error.response.status} - ${error.response.data.message}`);
            } else if (error.request) {
              setError("Error deleting item: No response from server");
            } else {
              setError(`Error deleting item: ${error.message}`);
            }
            console.error("Error deleting item:", error);
          });
      };

      const totalCartPrice = cart.reduce((total, item) => total + item.totalprice, 0);
  
    return (

      <div>
        <TopNav />
        <TopMenu />

      <div className="cart-container">
        <div className="content-wrapper">
          <div className="main-content">
            <h1 className="page-title">
              Cart{" "}
              <span className="product-count">
                ({cart.length} items found)
              </span>
            </h1>
  
            {/* Handle Error */}
            {error ? (
              <div className="error">Error: {error}</div>
            ) : loading ? (
              <div className="loading">Loading...</div>
            ) : cart.length > 0 ? (
              <div className="product-grid">
                {/* Map over the cart items and display each one */}
                {cart.map((item, index) => {
                  console.log(`Cart item ${index}:`, item); // Log each item to check the structure
  
                  return (
                    <div key={item.cart_item_id} className="product-card">
                      <div className="product-details">
                        {/* Display Product Image */}
                        {item.prod_image && (
                          <img
                            src={item.prod_image}
                            alt={item.prod_name}
                            className="product-image"
                          />
                        )}
  
                        <h3 className="product-name">{item.prod_name}</h3>
                        <p className="product-brand">{item.brand_name}</p>
                        
                        <div className="product-quantity">
                          <span>Quantity: {item.quantity}</span>
                        </div>
  
                        <div className="product-price">
                          <span>{formatPrice(item.prod_price)} ฿</span>
                        </div>
                        
                        <div className="product-totalprice">
                          <span>Total: {formatPrice(item.totalprice)} ฿</span>
                        </div>

                        <button
                          className="delete-button"
                          onClick={() => handleDelete(item.cart_item_id)}
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                  );
                })}
                {/* Display the total price of all items in the cart */}
              

              </div>
            ) : (
              <p className="text-center">ไม่มีสินค้าในตะกร้า</p> // No items in the cart message
            )}
          </div>
          <div className="cart-total">
                <h3>Total Cart Price: {formatPrice(totalCartPrice)} ฿</h3>
              </div>

              {/* Add Buy Button outside the product list */}
              <div className="buy-button-container">
                <button
                  className="buy-button"
                  onClick={handleBuy}
                >
                  ซื้อทั้งหมด
                </button>
              </div>
        </div>
      </div>
      
      <ScrollToTop />
      <Footer />
      </div>
    );
  };

export default Cart;