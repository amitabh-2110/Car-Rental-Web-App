import "./CarPage.css";
import React, { useEffect, useState } from "react";
import imageUrl from "../../assets/car.png";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../assets/baseUrl";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CarPage = () => {
  const [car, setCar] = useState({});
  const [bookingInfo, setBookingInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateInfo, setDateInfo] = useState({
    from: "",
    to: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector(state => state.userAuth);

  const carId = location.pathname.split("/").at(-1);

  // console.log(dateInfo);

  const fetchCarInfo = async () => {
    try {
      setLoading(true);
      const fetchCarApi = `${baseUrl}/Car/fetch-car-id?carId=${carId}`;
      const response = await fetch(fetchCarApi);
      const output = await response.json();
      const { carInfo, bookedCarInfo } = output;
      setCar(carInfo);
      setBookingInfo(bookedCarInfo);
      setLoading(false);
    } catch (error) {
      console.log("error in fetching car in car page ", error);
    }
  };

  const changeHandler = (event) => {
    const {name, value} = event.target;
    setDateInfo({
      ...dateInfo,
      [name]: value
    });
  }

  const validationHandler = () => {
    if(dateInfo.from === "" || dateInfo.to === "")
      return false;

    const fromMs = new Date(dateInfo.from).getTime()
    const toMs = new Date(dateInfo.to).getTime();

    if(toMs <= fromMs) 
      return false;

    return true;
  }

  const rangeHandler = () => {
    const givenFromMs = new Date(dateInfo.from).getTime();
    const givenToMs = new Date(dateInfo.to).getTime();
    let flag = true;

    /**
     * foreach loop doesn't return any value if we use return keyword, it will just skip the 
     * current iteration and move to another iteration. 
     */

    bookingInfo.forEach(info => { 
      let fromMs = new Date(info.fromDate).getTime()
      let toMs = new Date(info.toDate).getTime()

      if(fromMs < givenFromMs) {
        if(toMs >= givenFromMs) {
          flag = false;
          return;
        }
      }

      if(fromMs >= givenFromMs && fromMs <= givenToMs) {
        flag = false;
        return;
      }
    });

    return flag;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const flag = validationHandler();

    if(!flag) {
      toast.error("Please provide valid dates");
    } else {
      const rangeFlag = rangeHandler();
      // console.log(rangeFlag);
      if(!rangeFlag) {
        toast.error("Car not avaliable");
      } else {
        toast.success("Car available");
      }
    }
  }

  const bookCarHandler = () => {
    if(token === null) {
      toast.error("Please login to book car");
    } else if(dateInfo.from === "" || dateInfo.to === "" || !validationHandler() || !rangeHandler()) {
      toast.error("Please check car availability");
    } else {
      navigate(`/car/book-car?carId=${carId}&from=${dateInfo.from}&to=${dateInfo.to}`);
    }
  }

  // console.log(dateInfo);

  useEffect(() => {
    fetchCarInfo();
  }, []);

  return (
    <div className="car-page">
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className="car-page-container">
          <div className="photo-btn-container">
            <img src={imageUrl} alt="car-photo" className="car-photo" />

            <button onClick={bookCarHandler} className="book-btn">
              Book Car
            </button>
          </div>

          <div className="car-date-container">
            <div className="info-container">
              <div className="maker-info">
                Maker -{" "}
                <span className="info">{car.model.split("-").at(0)}</span>
              </div>

              <div className="model-info">
                Model - <span className="info">{car.model}</span>
              </div>

              <div className="fuel-info">
                Fuel - <span className="info">{car.fuelType}</span>
              </div>

              <div className="trans-info">
                Transmission Type -{" "}
                <span className="info">{car.transmissionType}</span>
              </div>

              <div className="price-info">
                Rental Price -{" "}
                <span className="info">{car.rentalPrice} Per Day</span>
              </div>
            </div>

            <div className="booking-date">
              <form onSubmit={submitHandler} className="booking-date-container">
                <div className="from-date">
                  <h3 className="head">From</h3>
                  <input
                    type="date"
                    name="from"
                    className="from-date"
                    onChange={changeHandler}
                    value={dateInfo.from}
                    min={new Date().toISOString().split("T").at(0)}
                  />
                </div>

                <div className="to-date mg-btm">
                  <h3 className="head">To</h3>
                  <input
                    type="date"
                    name="to"
                    className="to-date"
                    onChange={changeHandler}
                    value={dateInfo.to}
                    min={new Date().toISOString().split("T").at(0)}
                  />
                </div>

                <button className="search-btn">Search car</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarPage;
