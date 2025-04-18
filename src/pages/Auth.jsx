import React, { useState } from 'react';
import { User, Lock, Mail, Phone } from 'lucide-react';
import '../css/AuthForm.css';
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';


const AuthForm = () => {
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    cust_username: '',
    cust_password: ''
  });

  const [registerData, setRegisterData] = useState({
    cust_fname: '',
    cust_lname: '',
    cust_email: '',
    cust_phonenumber: '',
    cust_username: '',
    cust_password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.cust_username || !loginData.cust_password) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      const response = await axios.post('/api/v1/auth/login', loginData);
      const user = response.data;
      console.log(user);
      
      
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/store');
      } else {
        setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(registerData).some(value => !value)) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    if (registerData.cust_password !== registerData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      const { confirmPassword, ...registerDataToSend } = registerData;
      await axios.post('/api/v1/products/register', registerDataToSend);
      alert('ลงทะเบียนสำเร็จ'); // ใช้ window.alert เพื่อแจ้งเตือน
      setActiveTab('login');
      setError('');
      setRegisterData({
        cust_fname: '',
        cust_lname: '',
        cust_email: '',
        cust_phonenumber: '',
        cust_username: '',
        cust_password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Registration error:', error);
      setError('เกิดข้อผิดพลาดในการลงทะเบียน');
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
          <nav className="navbar navbar-light bg-light" style={{position:'fixed', width:'100%'}}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link className="navbar-brand">
          <img src="/assets/logo.png" alt="Logo" width="30" height="30" />
          <span style={{color: "#ae9371", marginLeft:"10px"}}>Furniture</span><span style={{color: "black"}}>Mall</span>
        </Link>
        </div>
        </nav>
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            เข้าสู่ระบบ
          </button>
          <button
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            สมัครสมาชิก
          </button>
        </div>

        <div className="auth-form-container">
          {activeTab === 'login' ? (
            <form 
              onSubmit={handleLoginSubmit} 
              className="auth-form" 
              autoComplete="off"
            >
              <div className="form-group">
                <div className="input-group">
                  <span className="input-icon">
                    <User size={20} />
                  </span>
                  <input
                    type="text"
                    name="cust_username"
                    placeholder="ชื่อผู้ใช้"
                    value={loginData.cust_username}
                    onChange={handleLoginChange}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-icon">
                    <Lock size={20} />
                  </span>
                  <input
                    type="password"
                    name="cust_password"
                    placeholder="รหัสผ่าน"
                    value={loginData.cust_password}
                    onChange={handleLoginChange}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="submit-button">
                เข้าสู่ระบบ
              </button>

              <div className="forgot-password">
                <a href="/">ลืมรหัสผ่าน?</a>
              </div>
            </form>
          ) : (
            <form 
              onSubmit={handleRegisterSubmit} 
              className="auth-form"
              autoComplete="off"
            >
              <div className="form-group">
                <div className="input-group">
                  <span className="input-icon">
                    <User size={20} />
                  </span>
                  <input
                    type="text"
                    name="cust_fname"
                    placeholder="ชื่อ"
                    value={registerData.cust_fname}
                    onChange={handleRegisterChange}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <span className="input-icon">
                    <User size={20} />
                  </span>
                  <input
                    type="text"
                    name="cust_lname"
                    placeholder="นามสกุล"
                    value={registerData.cust_lname}
                    onChange={handleRegisterChange}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <span className="input-icon">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    name="cust_email"
                    placeholder="อีเมล"
                    value={registerData.cust_email}
                    onChange={handleRegisterChange}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <span className="input-icon">
                    <Phone size={20} />
                  </span>
                  <input
                    type="tel"
                    name="cust_phonenumber"
                    placeholder="เบอร์โทรศัพท์"
                    value={registerData.cust_phonenumber}
                    onChange={handleRegisterChange}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <span className="input-icon">
                    <User size={20} />
                  </span>
                  <input
                    type="text"
                    name="cust_username"
                    placeholder="ชื่อผู้ใช้"
                    value={registerData.cust_username}
                    onChange={handleRegisterChange}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-group">
                  <span className="input-icon">
                    <Lock size={20} />
                  </span>
                  <input
                    type="password"
                    name="cust_password"
                    placeholder="รหัสผ่าน"
                    value={registerData.cust_password}
                    onChange={handleRegisterChange}
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-icon">
                    <Lock size={20} />
                  </span>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="ยืนยันรหัสผ่าน"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}

              <button type="submit" className="submit-button">
                สมัครสมาชิก
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};
export default AuthForm;

