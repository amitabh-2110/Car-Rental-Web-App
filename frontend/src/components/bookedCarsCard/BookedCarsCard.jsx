import './BookedCarsCard.css';
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../assets/baseUrl";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BookedCarsCard = ({
  bookingId,
  vehicleId,
  fromDate,
  toDate,
  isRequest,
  isApproved
}) => {
  const [requestStatus, setRequestStatus] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  const {token, role} = useSelector(state => state.userAuth);
  const navigate = useNavigate();

  const requestHandler = async () => {
    try {
      const returnRequestApi = `${baseUrl}/${role === "admin"? 'Admin': 'User'}?bookingId=${bookingId}`;
      const response = await fetch(returnRequestApi, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const output = await response.json();
      toast.success(output.message);

      if(role === "user") 
        setRequestStatus(true);

      if(role === "admin") 
        setApproveStatus(true);

    } catch(error) {
      console.log("Error in return request ", error);
    }
  }

  const agreementHandler = () => {
    navigate(`/car-agreements/${bookingId}`);
  }

  const deleteHandler = async () => {
    try {
      const deleteApi = `${baseUrl}/Admin?carId=${bookingId}`;
      const response = await fetch(deleteApi, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const output = await response.json();
      console.log(output);
      toast.success("Agreement deleted successfully");
      navigate("/");
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setRequestStatus(isRequest);
    setApproveStatus(isApproved);
  }, []);

  // console.log(`${vehicleId}-req ${requestStatus}-app ${approveStatus}`);

  return (
    <div className="booked-cars-card">
      <div className="car-info-container">
        <div className="car-id-cont font-bold">Vehicle Id: {vehicleId}</div>
        <div className="book-id-cont font-bold">Booking Id: {bookingId}</div>
        <div className="from-date-cont">From: {fromDate}</div>
        <div className="to-date-cont">To: {toDate}</div>
      </div>

      <div className="btn-container">
        {role === "user" && (
          <div className="user-btn">
            {requestStatus ? (
              <button disabled className="pen-btn">Request Pending</button>
            ) : (
              <button onClick={requestHandler} className="btn red-btn">
                Request return
              </button>
            )}
          </div>
        )}

        {role === "admin" && (
          <div className="admin-btn-grp">
            {approveStatus ? (
              <button disabled className="pen-btn">Request Approved</button>
            ) : (
              <div>
                {requestStatus && (
                  <button onClick={requestHandler} className="btn green-btn">
                    Approve return request
                  </button>
                )}
              </div>
            )}

            <button onClick={deleteHandler} className="btn red-btn">
              Delete
            </button>
          </div>
        )}

        <button onClick={agreementHandler} className="btn green-btn">
          View agreement
        </button>
      </div>
    </div>
  );
};

export default BookedCarsCard;
