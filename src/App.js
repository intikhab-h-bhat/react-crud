import logo from './logo.svg';
import './App.css';
import './style.css'
import GetClinics from './components/GetClinics';
import GetStaff from './components/GetStaff';
import { BrowserRouter as Router, Route, Routes, Link,useNavigate} from "react-router-dom";
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import LogOut from './components/LogOut';
import React, { useState, useEffect } from 'react';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  // This effect checks for login info in localStorage (or you can use cookies)
  useEffect(() => {
    const token = localStorage.getItem('token'); // assuming you store something like user token or ID
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    //localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem("token", token)
    setIsLoggedIn(true);
  };

  const handleLogout = async() => {
    console.log("Logout button clicked");
    try {
        const response = await fetch("https://localhost:7098/api/Auth/logout", {
            method: "GET"                              
        });

        if (response.ok) {              
            localStorage.removeItem("token"); // Remove the token from local storage
            setIsLoggedIn(false);
            navigate('/login'); // Redirect to login page
            alert("Logged out successfully");
        } else {
            alert("logout failed");
        }
    } catch (error) {
        console.log(error);
    }       
};


  return (
    
    <>
    <div className="container mt-4">
      <h1 className="text-center mb-4">Clinic Staff Management System</h1>
      
     
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <ul className="navbar-nav">
        {isLoggedIn && (
          <>
          <li className="nav-item">
            <Link className="nav-link" to="/users">Clinic</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/staff">Staff</Link>
          </li>
          <li className="nav-item">
          <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
        </li>
          </>
        )}

        {!isLoggedIn && (
          <>
        <li className="nav-item">
            <Link className="nav-link" to="/register">Register User</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          </>
        )}
        </ul>
      </nav>
       
      
      
      <Routes>
        <Route path="/users" element={<GetClinics />} />
        <Route path="/staff" element={<GetStaff />} />
        <Route path="/register" element={<RegisterUser/>} />
        <Route path="/login" element={<LoginUser onLogin={handleLogin} />} />
        <Route path="/logout" element={<LogOut/>} />
    
      </Routes>
    </div>
    </>
 
      
  );
}

export default App;
