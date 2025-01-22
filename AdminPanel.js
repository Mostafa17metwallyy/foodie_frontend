import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newBooking, setNewBooking] = useState({ name: "", date: "" });
  const [newMenuItem, setNewMenuItem] = useState({ name: "", price: "" });

  useEffect(() => {
    fetchBookings();
    fetchMenuItems();
  }, []);

  // Fetch Bookings from Database
  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/admin/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  // Fetch Menu Items from Database
  const fetchMenuItems = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/admin/menuitems");
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  };

  // Add Booking
  const handleAddBooking = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBooking),
      });
      if (response.ok) {
        fetchBookings();
        setNewBooking({ name: "", date: "" });
      }
    } catch (error) {
      console.error("Failed to add booking:", error);
    }
  };

  // Delete Booking
  const handleDeleteBooking = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/admin/bookings/${id}`, {
        method: "DELETE",
      });
      if (response.ok) fetchBookings();
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  // Add Menu Item
  const handleAddMenuItem = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/admin/menuitems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMenuItem),
      });
      if (response.ok) {
        fetchMenuItems();
        setNewMenuItem({ name: "", price: "" });
      }
    } catch (error) {
      console.error("Failed to add menu item:", error);
    }
  };

  // Delete Menu Item
  const handleDeleteMenuItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/admin/menuitems/${id}`, {
        method: "DELETE",
      });
      if (response.ok) fetchMenuItems();
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {/* Bookings Section */}
      <section>
        <h2>Bookings</h2>
        <ul>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <li key={booking._id}>
                <strong>{booking.name}</strong> - {new Date(booking.date).toLocaleDateString()}
                <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No bookings available.</p>
          )}
        </ul>
        <h3>Add Booking</h3>
        <input
          type="text"
          placeholder="Name"
          value={newBooking.name}
          onChange={(e) => setNewBooking({ ...newBooking, name: e.target.value })}
        />
        <input
          type="date"
          value={newBooking.date}
          onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
        />
        <button onClick={handleAddBooking}>Add Booking</button>
      </section>

      {/* Menu Items Section */}
      <section>
        <h2>Menu Items</h2>
        <ul>
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <li key={item._id}>
                <strong>{item.name}</strong> - ${item.price.toFixed(2)}
                <button onClick={() => handleDeleteMenuItem(item._id)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No menu items available.</p>
          )}
        </ul>
        <h3>Add Menu Item</h3>
        <input
          type="text"
          placeholder="Name"
          value={newMenuItem.name}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newMenuItem.price}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
        />
        <button onClick={handleAddMenuItem}>Add Menu Item</button>
      </section>
    </div>
  );
};

export default AdminPanel;
