using BusinessObjectLayer.DTO;
using BusinessObjectLayer.Models;
using DataAccessLayer.DataServices.CarDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.LogicServices.CarLogicService
{
    public class CarLogic: ICarLogic
    {
        private readonly ICarData _carData;

        public CarLogic(ICarData carData)
        {
            _carData = carData;
        }

        public async Task<List<Car>> FetchCars()
        {
            var cars = await _carData.FetchCars();
            return cars;
        }

        public async Task<Car> FetchCarById(Guid carId)
        {
            var car = await _carData.FetchCarById(carId);
            return car;
        }

        public async Task BookCar(BookCarDto car)
        {
            var carToBook = new BookedCar
            {
                BookingId = Guid.NewGuid(),
                UserId = car.UserId,
                VehicleId = new Guid(car.VehicleId),
                FromDate = car.FromDate,
                ToDate = car.ToDate,
                IsRequest = false,
                IsApproved = false
            };

            await _carData.BookCar(carToBook);
        }

        public async Task<BookedCar> FetchBookedCarById(string bookingId)
        {
            var cars = await _carData.FetchBookedCars();
            var reqCars = cars.Where(car => car.BookingId == new Guid(bookingId)).ToList();

            return reqCars.ElementAt(0);
        }

        public async Task<List<BookedCar>> FetchBookedCars()
        {
            var bookedCars = await _carData.FetchBookedCars();
            return bookedCars;
        }

        public async Task<List<BookedCar>> FetchBookedCarsForReturn()
        {
            var bookedCars = await _carData.FetchBookedCars();
            var reqCars = bookedCars.Where(car => car.IsRequest == true).ToList();

            return reqCars;
        }

        public async Task<List<Maker>> FetchCarMakers()
        {
            var makers = await _carData.FetchCarMakers();
            return makers;
        }

        public async Task<List<Car>> FilterCarByMakerModelSearch(string maker, string model)
        {
            var cars = await _carData.FetchCars();
            var makers = await _carData.FetchCarMakers();

            var reqCars = cars.Where(car =>
                (maker == "All" || maker == makers[car.Maker].Name) && car.Model.Contains(model))
                .ToList();

            return reqCars;
        }

        public async Task<List<BookedCar>> BookedCarInfoByCarId(Guid carId)
        {
            var cars = await _carData.FetchBookedCars();
            var reqCars = cars.Where(car => car.VehicleId == carId).ToList();

            return reqCars;
        }

        public async Task<List<BookedCar>> BookedCarInfoByUserId(string userId)
        {
            var cars = await _carData.FetchBookedCars();
            var reqCars = cars.Where(car => car.UserId == userId).ToList();

            return reqCars;
        }

        public async Task RequestApprove(string bookingId)
        {
            var cars = await _carData.FetchBookedCars();
            var reqBookedCar = cars.Where(bookedCar => bookedCar.BookingId == new Guid(bookingId)).ToList();

            if (reqBookedCar.Count > 0)
            {
                var car = reqBookedCar.ElementAt(0);
                car.IsApproved = true;
                await _carData.UpdateBookedCar(car);
            }
        }

        public async Task RequestReturnCar(string bookingId)
        {
            var cars = await _carData.FetchBookedCars();
            var reqBookedCar = cars.Where(bookedCar => bookedCar.BookingId == new Guid(bookingId)).ToList();

            if(reqBookedCar.Count > 0)
            {
                var car = reqBookedCar.ElementAt(0);
                car.IsRequest = true;
                await _carData.UpdateBookedCar(car);
            }
        }

        public async Task UpdateBookedCar(UpdateBookedCarDto bookedCar)
        {
            var cars = await _carData.FetchBookedCars();
            var reqCars = cars.Where(car => car.BookingId == new Guid(bookedCar.BookingId)).ToList().ElementAt(0);

            var car = new BookedCar
            {
                BookingId = reqCars.BookingId,
                UserId = reqCars.UserId,
                VehicleId = reqCars.VehicleId,
                FromDate = bookedCar.FromDate,
                ToDate = bookedCar.ToDate,
                IsRequest = reqCars.IsRequest,
                IsApproved = reqCars.IsApproved,
            };

            await _carData.UpdateBookedCar(car);
        }

        public async Task DeleteBookedCar(Guid bookingId)
        {
            await _carData.DeleteBookedCar(bookingId); 
        }
    }
}
