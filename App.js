import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import Work from './components/work';
import Menu from './components/menu';
import Cart from './components/cart';
import Testimonials from './components/testmonials';
import Footer from './components/Footer';
import NavBar from './components/navBar';
import Login from './components/login';
import { CartProvider } from './context/cartContext'; 
import Contacts from '../src/components/Contacts'; 
import Bookings from '../src/components/Booking';
import AdminPanel from '../src/components/AdminPanel'; // Import Admin Panel

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/work" element={<Work />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/cart" element={<Cart loggedIn={loggedIn} />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/admin" element={<AdminPanel />} /> 
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
