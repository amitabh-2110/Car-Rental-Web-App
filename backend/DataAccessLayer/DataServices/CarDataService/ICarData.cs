using BusinessObjectLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataServices.CarDataService
{
    public interface ICarData
    {
        public Task<List<Car>> FetchCars();

        public Task<Car> FetchCarById(Guid id);

        public Task BookCar(BookedCar car);

        public Task UpdateBookedCar(BookedCar bookedCar);

        public Task DeleteBookedCar(Guid bookingId);

        public Task<List<BookedCar>> FetchBookedCars();

        public Task<List<Maker>> FetchCarMakers();
    }
}
