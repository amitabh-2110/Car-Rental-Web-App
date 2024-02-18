import React from "react";
import carImage from "../../assets/car.png";
import { Link } from "react-router-dom";
import "./CarCard.css";

const CarCard = (props) => {
  const { vehicleId, model, rentalPrice, transmissionType, fuelType } = props;

  return (
    <div className="car-card">
      <div className="image-container">
        <img src={carImage} alt="car-image" className="car-image" />
      </div>

      <div className="car-info-cont">
        <div className="maker-info">{model.split("-")[0]}</div>
        <div className="model-info">{model}</div>
        <div className="car-type-info">
          <div className="fuel-type">{fuelType}</div>
          <div className="trans-type">{transmissionType}</div>
        </div>
        <div className="book-info">
          <div className="price-info">
            ₹ {rentalPrice} <span className="day">/ day</span>
          </div>
          <Link to={`/car/${vehicleId}`} className="book-car-btn">
            Book
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
