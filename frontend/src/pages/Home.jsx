import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to GroceryHub 🛒</h1>
        <p>
          Manage your grocery items, track spending, and simplify your daily shopping experience.
        </p>
        <button onClick={() => navigate("/groceries")} className="primary-btn">
          Start Managing Groceries
        </button>
      </div>

      <div className="image-section">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
          alt="Grocery Illustration"
        />
      </div>
    </div>
  );
}
