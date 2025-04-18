import React from 'react';
import TopNav from '../components/TopNav'; // ส่วนแสดง Navigation Bar
import TopMenu from '../components/TopMenu'; // ส่วนแสดงเมนูด้านบน
import BannerCarousel from '../components/BannerCarousel'; // ส่วนแสดง Banner
import NewProducts from '../components/NewProducts'; // ส่วนแสดงสินค้ามาใหม่
import Footer from '../components/Footer'; // ส่วนแสดง Footer
// import BrandCat from '../components/BrandCat';
import Reccomand from '../components/Reccomand';
import ScrollToTop from '../components/ScrollToTop';

const Home = () => {
  return (
    <div>
      <TopNav /> {/* ส่วนค้นหาจะอยู่ใน TopNav */}
      <TopMenu />
      <BannerCarousel />
      {/* <BrandCat /> */}
      <NewProducts /> {/* แสดงสินค้ามาใหม่ */}
      <Reccomand />{/* แสดงสินค้าแนะนำ */}
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
