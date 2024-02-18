import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../assets/baseUrl";
import BookedCarsCard from "../bookedCarsCard/BookedCarsCard";

const BookedCars = () => {
  const [cars, setCars] = useState([]);
  const { token, username, role } = useSelector((state) => state.userAuth);

  const fetchCars = async () => {
    try {
      const fetchApi = `${baseUrl}/${
        role === "admin" ? "Admin" : `User?userId=${username}`
      }`;
      const response = await fetch(fetchApi, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const output = await response.json();
      console.log(output);
      setCars(output);
    } catch (error) {
      console.log("Error occured in booked cars ", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="booked-cars">
      {cars.length === 0 ? (
        <div className="no-cars font-bold">No bookings found</div>
      ) : (
        cars.map((car) => <BookedCarsCard key={car.bookingId} {...car} />)
      )}
    </div>
  );
};

export default BookedCars;
