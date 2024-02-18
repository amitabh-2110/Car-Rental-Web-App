import React, { useEffect, useState } from "react";
import CarCard from "../carCard/CarCard";
import SearchCars from "../searchCars/SearchCars";
import { baseUrl } from "../../assets/baseUrl";
import './Home.css';

const Home = () => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const fetchCarsApi = `${baseUrl}/Car`;
      const response = await fetch(fetchCarsApi);
      const output = await response.json();
      // console.log(output);
      setCars(output);
    } catch (error) {
      console.log(`Error in fetching cars ${error}`);
    }
  };

  const submitHandler = async (searchCarInfo) => {
    const fetchCarsApi = `${baseUrl}/Car/filter-car?maker=${searchCarInfo.maker}&model=${searchCarInfo.model}`;
    const response = await fetch(fetchCarsApi);
    const output = await response.json();
    // console.log(output);
    setCars(output);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="home">
      <SearchCars submitHandler={submitHandler} />

      {cars.length === 0 ? (
        <h2 className="no-cars">No Cars Found !!</h2>
      ) : (
        <div className="cars-container">
          {cars.map((car) => (
            <CarCard key={car.vehicleId} {...car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
