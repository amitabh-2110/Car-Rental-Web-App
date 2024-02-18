using BusinessObjectLayer.DTO;
using BusinessObjectLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.LogicServices.CarLogicService
{
    public interface ICarLogic
    {
        public Task<List<Car>> FetchCars();

        public Task<Car> FetchCarById(Guid carId);

        public Task BookCar(BookCarDto car);

        public Task<BookedCar> FetchBookedCarById(string bookingId);

        public Task<List<BookedCar>> FetchBookedCars();

        public Task<List<Maker>> FetchCarMakers();

        public Task<List<Car>> FilterCarByMakerModelSearch(string maker, string model);

        public Task<List<BookedCar>> FetchBookedCarsForReturn();

        public Task<List<BookedCar>> BookedCarInfoByCarId(Guid carId);

        public Task<List<BookedCar>> BookedCarInfoByUserId(string userId);

        public Task RequestReturnCar(string bookingId);

        public Task RequestApprove(string bookingId);

        public Task UpdateBookedCar(UpdateBookedCarDto bookedCar);

        public Task DeleteBookedCar(Guid bookingId);
    }
}
