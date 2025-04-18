import React, { useState, useEffect } from 'react';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // ฟังก์ชันที่จะเรียกใช้เมื่อเลื่อนหน้าจอ
  const handleScroll = () => {
    if (window.scrollY > 200) {  // เมื่อเลื่อนเกิน 200px
      setIsVisible(true);  // แสดงปุ่ม
    } else {
      setIsVisible(false);  // ซ่อนปุ่ม
    }
  };

  // ฟังก์ชันสำหรับเลื่อนกลับไปยังด้านบน
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',  // ทำให้การเลื่อนขึ้นไปข้างบนมีความนุ่มนวล
    });
  };

  // ติดตามการเลื่อนหน้าจอ
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // ลบ event listener เมื่อคอมโพเนนต์ถูกทำลาย
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>


      {/* ปุ่มจะปรากฏเมื่อเลื่อนหน้าจอลงไป */}
      <button
        className={`button-fixed ${isVisible ? 'show' : ''}`}
        onClick={scrollToTop}  // เมื่อคลิกจะทำการเลื่อนขึ้น
      >
        <img src={'../assets/images/ScrollToTop.png'} alt={'Top'}  width={"30px"}></img>
      </button>
    </div>
  );
}

export default ScrollToTop;
