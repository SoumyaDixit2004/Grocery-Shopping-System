import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Groceries from "./pages/Groceries.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./app.css";

export default function App() {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <h2 className="logo">Grocery<span>Hub</span></h2>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/groceries">Groceries</Link></li>
          <li className="dropdown">
            Account ▾
            <ul className="dropdown-menu">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
              <li onClick={logoutUser}>Logout</li>
            </ul>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/groceries" element={<ProtectedRoute><Groceries /></ProtectedRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
