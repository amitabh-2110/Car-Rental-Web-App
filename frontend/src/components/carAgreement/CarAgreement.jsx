import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../assets/baseUrl';
import { useSelector } from 'react-redux';
import UpdateBookedCar from '../updateBookedCar/UpdateBookedCar';
import './CarAgreement.css';

const CarAgreement = ({userId, vehicleId, fromDate, toDate}) => {
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(true);
  const {role} = useSelector(state => state.userAuth);

  const fetchCar = async (vehicleId) => {
    try {
      setLoading(true);
      const fetchCarApi = `${baseUrl}/Car/fetch-car-id?carId=${vehicleId}`;
      const response = await fetch(fetchCarApi);
      const output = await response.json();
      const { carInfo } = output;
      setCar(carInfo);
      setLoading(false);
    } catch(error) {
      console.log("Error occured in fetching car in car agreement", error);
    }
  }

  const countDays = () => {
    let fromDateMs = new Date(fromDate).getTime();
    let toDateMs = new Date(toDate).getTime();

    let msDiff = toDateMs - fromDateMs;
    let dayMs = 24 * 60 * 60 * 1000;
    let days = Math.round(msDiff/dayMs);

    return days;
  }

  useEffect(() => {
    if(vehicleId !== undefined) fetchCar(vehicleId);
  }, [vehicleId]);

  return (
    <div className="car-agreement">
      {loading? (
        <div>Loading ...</div>
      ) : (
        <div className="agreement-container">
          <h1>Car Agreement</h1>
          <p>This agreement is made between the buyer and seller of the car. It outlines the terms and 
            conditions of the sale, payment details, and other relevant information.</p>

          {role === "admin" && <UpdateBookedCar />}

          <h2>Booking Details</h2>
          <ul className="book-list">
              <li>Customer Name: {userId.split('@').at(0)}</li>
              <li>Maker: {car.model.split('-').at(0)}</li>
              <li>Model: {car.model}</li>
              <li>Booked From: {fromDate} To: {toDate}</li>
              <li>Fuel Type: {car.fuelType}</li>
              <li>Transmission Type: {car.transmissionType}</li>
              <li>Vehicle Identification No.: {vehicleId}</li>
              <li>Cost for {countDays()} days: ₹ {countDays() * car.rentalPrice}</li>
          </ul>

          <h2>Terms and Conditions</h2>
          <p>
            Please keep your original Driving License handy. While delivering the car to you, our 
            executive will verify your original Driving License and ID proof (same as the ones whose 
            details were provided while making the booking). This verification is mandatory. In the 
            unfortunate case where you cannot show these documents, we will not be able to handover the car
            to you, and it will be treated as a late cancellation (100% of the fare would be payable). 
            Driving license printed on A4 sheet of paper (original or otherwise) will not be considered as
            a valid document.
          </p>
        </div>
      )}
    </div>
  );
}

export default CarAgreement