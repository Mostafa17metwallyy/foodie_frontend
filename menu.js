import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/cartContext';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5001/api/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError('Failed to load menu items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <h2 className='primary-heading'>Menu</h2>
      <div className="menu-page">
        <div className="menu-container">
          {loading ? (
            <p>Loading menu items...</p>
          ) : menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div key={item._id} className="menu-item">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.name} className="menu-item-image" />
                )}
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className="menu-price">${item.price.toFixed(2)}</p>
                {item.isAvailable ? (
                  <button 
                    onClick={() => addToCart(item)} 
                    className='secondary-button'
                  >
                    Add to Cart
                  </button>
                ) : (
                  <p className="unavailable">Currently Unavailable</p>
                )}
              </div>
            ))
          ) : (
            <p>No menu items available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
