import logo from './logo.svg';
import './App.css';
import './style.css'
import GetClinics from './components/GetClinics';
import GetStaff from './components/GetStaff';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";



function App() {


  return (
    <Router>
    <div className="container mt-4">
      <h1 className="text-center mb-4">Clinic Staff Management System</h1>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/users">Clinic</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/staff">Staff</Link>
          </li>
         
        </ul>
      </nav>

      <Routes>
        <Route path="/users" element={<GetClinics />} />
        <Route path="/staff" element={<GetStaff />} />
       
      </Routes>
    </div>
  </Router>
      
  );
}

export default App;
