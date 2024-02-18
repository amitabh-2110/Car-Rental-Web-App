import React, { useEffect, useState } from "react";
import { baseUrl } from "../../assets/baseUrl";
import { AiOutlineSearch } from "react-icons/ai";
import './SearchCars.css';

const SearchCars = ({ submitHandler }) => {
  const [makers, setMakers] = useState([]);
  const [searchCar, setSearcCar] = useState({
    maker: "All",
    model: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setSearcCar({
      ...searchCar,
      [name]: value,
    });
  };

  const fetchMakers = async () => {
    try {
      const fetchMakersApi = `${baseUrl}/Car/fetch-makers`;
      const response = await fetch(fetchMakersApi);
      const output = await response.json();
      // console.log(output);
      setMakers(output);
    } catch (error) {
      console.log(`Error in fetching makers ${error}`);
    }
  };

  useEffect(() => {
    fetchMakers();
  }, []);

  return (
    <div className="search-cars">
      <select
        className="select-maker"
        name="maker"
        onChange={changeHandler}
        value={searchCar.maker}
      >
        <option value="All">All</option>
        {makers.map((maker) => (
          <option key={maker.makerId} value={maker.name}>
            {maker.name}
          </option>
        ))}
      </select>

      <div className="header-search">
        <AiOutlineSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search Model"
          name="model"
          className="search"
          value={searchCar.model}
          onChange={changeHandler}
        />
      </div>

      <button className="search-btn" onClick={() => submitHandler(searchCar)}>
        Search car
      </button>
    </div>
  );
};

export default SearchCars;
