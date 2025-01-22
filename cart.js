import React, { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cart, clearCart, removeFromCart } = useContext(CartContext);
  const [isPaying, setIsPaying] = useState(false);

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  // Handle payment
  const handlePayment = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before proceeding to payment.");
      return;
    }

    setIsPaying(true);

    // Simulate a payment process
    setTimeout(() => {
      alert("Payment successful! Thank you for your purchase.");
      clearCart(); // Clear the cart after payment
      setIsPaying(false);
    }, 2000);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-details">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="delete-button"
                  aria-label="Remove item"
                >
                  <FaTrash color="red" />
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
          <div className="cart-actions">
            <button onClick={clearCart} className="secondary-button">Clear Cart</button>
            <button 
              onClick={handlePayment} 
              className="secondary-button" 
              disabled={isPaying}
            >
              {isPaying ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
