import React, { useEffect, useState } from "react";
import CarAgreement from "../carAgreement/CarAgreement";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../assets/baseUrl";
import { useSelector } from "react-redux";

const BookingInfo = () => {
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState({});
  const location = useLocation();
  const { token } = useSelector((state) => state.userAuth);
  const bookingId = location.pathname.split("/").at(-1);

  const fetchBookedCar = async () => {
    try {
      setLoading(true);
      const fetchApi = `${baseUrl}/Car/fetch-booked-car-id?bookingId=${bookingId}`;
      const response = await fetch(fetchApi, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const output = await response.json();
      setCar(output.bookedCar);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookedCar();
  }, []);

  return (
    <div className="booking-info">
      {loading ? (
        <div className="no-cars font-bold">Loading ...</div>
      ) : (
        <CarAgreement
          userId={car.userId}
          vehicleId={car.vehicleId}
          fromDate={car.fromDate}
          toDate={car.toDate}
        />
      )}
    </div>
  );
};

export default BookingInfo;
