import Navbar from './components/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import BookedCars from './components/bookedCars/BookedCars';
import Login from './components/login/Login';
import CarPage from './components/carPage/CarPage';
import BookCar from './components/bookCar/BookCar';
import ProtectedRoute from './components/protectedRoutes/ProtectedRoute';
import UserProtectedRoute from './components/protectedRoutes/UserProtectedRoute';
import BookingInfo from './components/bookingInfo/BookingInfo';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/car/:carid" element={<CarPage />} />

        <Route path="/login" element={<Login />} />
        
        <Route path="/car-agreements" element={
          <ProtectedRoute>
            <BookedCars />
          </ProtectedRoute>
        } />

        <Route path="/car-agreements/:bookingId" element={
          <ProtectedRoute>
            <BookingInfo />
          </ProtectedRoute>
        } />

        <Route path="/car/book-car" element={
          <UserProtectedRoute>
            <BookCar />
          </UserProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
