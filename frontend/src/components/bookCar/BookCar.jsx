import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CarAgreement from "../carAgreement/CarAgreement";
import { baseUrl } from "../../assets/baseUrl";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import './BookCar.css';

const BookCar = () => {
  const [info, setInfo] = useState({});
  const [searchParams] = useSearchParams();
  const { username, token } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  const bookCarHandler = async () => {
    try {
      const bookCarApi = `${baseUrl}/User`;
      const response = await fetch(bookCarApi, {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const output = await response.json();
      toast.success(output.message);
      navigate("/");
    } catch (error) {
      console.log("Error in booking car ", error);
    }
  };

  useEffect(() => {
    setInfo({
      userId: username,
      vehicleId: searchParams.get("carId"),
      fromDate: searchParams.get("from"),
      toDate: searchParams.get("to"),
    });
  }, []);

  return (
    <div className="book-car">
      <CarAgreement {...info} />

      <div className="btn-container">
        <button onClick={() => navigate(-1)} className="cancel-btn btn">
          Cancel
        </button>
        <button onClick={bookCarHandler} className="accept-btn btn">
          Accept
        </button>
      </div>
    </div>
  );
};

export default BookCar;
