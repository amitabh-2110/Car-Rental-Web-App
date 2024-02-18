import React, { useState } from 'react'
import { baseUrl } from '../../assets/baseUrl';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../features/userAuth/userAuthSlice';
import './Login.css';

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    userId: "",
    password: ""
  });

  const dispath = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (event) => {
    const {name, value} = event.target;
    setUserLogin({
      ...userLogin,
      [name]: value
    });
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    
    const loginUserApi = `${baseUrl}/Auth`;
    const response = await fetch(loginUserApi, {
      method: "POST",
      body: JSON.stringify(userLogin),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const output = await response.json();
    // console.log(output);
    if(output.statusCode === 200) {
      toast.success(output.message);
      dispath(setToken(output.token));
      navigate("/");
    } else {
      toast.error(output.message);
    }
  }

  return (
    <div className="login">
      <div className="form-container">
        <form className="form" onSubmit={submitHandler}>
          <h2 className="form-header">Login</h2>

          <div className="form-field">
            <input
              type="email"
              name="userId"
              id="email"
              className="email field"
              placeholder="Email"
              onChange={changeHandler}
              value={userLogin.userId}
            />
          </div>

          <div className="form-field">
            <input
              type="password"
              name="password"
              id="password"
              className="password field"
              placeholder="Password"
              onChange={changeHandler}
              value={userLogin.password}
            />
          </div>

          <button type="submit" className="form-btn btn green-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login