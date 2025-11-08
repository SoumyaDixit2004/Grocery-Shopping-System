import { useState, useEffect } from "react";
import api from "../services/api";

export default function Groceries() {
  const [groceries, setGroceries] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });
  const [message, setMessage] = useState("");

  // Fetch groceries from backend
  const fetchGroceries = async () => {
    try {
      const { data } = await api.get("/groceries");
      setGroceries(data);
    } catch (error) {
      console.error("Error fetching groceries:", error);
    }
  };

  // Add grocery
  const addGrocery = async (e) => {
    e.preventDefault();
    try {
      await api.post("/groceries", form);
      setMessage("Item added successfully!");
      setForm({ name: "", quantity: "", price: "" });
      fetchGroceries();
    } catch {
      setMessage("Error adding grocery");
    }
  };

  // Delete grocery
  const deleteGrocery = async (id) => {
    try {
      await api.delete(`/groceries/${id}`);
      fetchGroceries();
    } catch (error) {
      console.error("Error deleting grocery:", error);
    }
  };

  // Calculate totals
  const totalItems = groceries.length;
  const totalQuantity = groceries.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const totalBill = groceries.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.price || 0),
    0
  );

  useEffect(() => {
    fetchGroceries();
  }, []);

  return (
    <div className="grocery-container">
      <h2>🛒 Grocery List</h2>

      <form onSubmit={addGrocery} className="grocery-form">
        <input
          placeholder="Item name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price per item"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <button type="submit">Add</button>
      </form>

      {message && <p className="msg">{message}</p>}

      <ul className="grocery-list">
        {groceries.map((g) => (
          <li key={g._id} className="grocery-item">
            <div>
              <strong>{g.name}</strong> — {g.quantity} pcs @ ₹{g.price}
            </div>
            <button onClick={() => deleteGrocery(g._id)}>❌</button>
          </li>
        ))}
      </ul>

      {/* 🧾 Cart Summary Section */}
      <div className="cart-summary">
        <h3>🧺 Cart Summary</h3>
        <p>Total Items: <strong>{totalItems}</strong></p>
        <p>Total Quantity: <strong>{totalQuantity}</strong></p>
        <p>Total Bill: <strong>₹{totalBill}</strong></p>
      </div>
    </div>
  );
}
