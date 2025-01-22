import React from "react";
import { useNavigate } from "react-router-dom";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/menu");
  };

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Your Favorite Food Delivered Hot and Fresh
          </h1>
          <p className="primary-text">
            Healthy switcher chefs do all the prep work, like peeling, chopping
            & marinating, so you can cook fresh food.
          </p>
          <button className="secondary-button" onClick={handleOrderClick}>
            Order Now <FiArrowRight />
          </button>
        </div>
        <div className="home-image-container">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
