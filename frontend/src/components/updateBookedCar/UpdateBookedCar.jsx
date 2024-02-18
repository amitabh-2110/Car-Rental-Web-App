import React, { useState } from 'react'
import { baseUrl } from '../../assets/baseUrl';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const UpdateBookedCar = () => {
  const [dateInfo, setDateInfo] = useState({
    fromDate: "",
    toDate: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const {token, role} = useSelector(state => state.userAuth);
  const bookingId = location.pathname.split('/').at(-1);

  const changeHandler = (event) => {
    const {name, value} = event.target;
    setDateInfo({
      ...dateInfo,
      [name]: value
    });
  }

  const validationHandler = () => {
    if(dateInfo.fromDate === "" || dateInfo.toDate === "")
      return false;

    const fromMs = new Date(dateInfo.fromDate).getTime();
    const toMs = new Date(dateInfo.toDate).getTime();

    if(toMs <= fromMs) 
      return false;

    return true;
  }

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const flag = validationHandler();

      if(!flag) {
        toast.error("Please provide valid dates");
      } else {
        const updateApi = `${baseUrl}/Admin/update-booked-car`;
        const updateInfo = { ...dateInfo, bookingId };
        const response = await fetch(updateApi, {
          method: "PUT",
          body: JSON.stringify(updateInfo),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        const output = await response.json();
        toast.success(output.message);
        navigate("/car-agreements");
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="update-car-handler">
      <div className="booking-date-container">
        <form onSubmit={submitHandler}>
          <div className="from-date">
            <h3 className="head">From</h3>
            <input
              type="date"
              name="fromDate"
              className="from-date"
              onChange={changeHandler}
              value={dateInfo.fromDate}
              min={new Date().toISOString().split("T").at(0)}
            />
          </div>

          <div className="to-date">
            <h3 className="head">To</h3>
            <input
              type="date"
              name="toDate"
              className="to-date"
              onChange={changeHandler}
              value={dateInfo.toDate}
              min={new Date().toISOString().split("T").at(0)}
            />
          </div>

          <button>Update</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateBookedCar