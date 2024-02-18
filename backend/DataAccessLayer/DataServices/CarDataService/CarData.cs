using BusinessObjectLayer.Data;
using BusinessObjectLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataServices.CarDataService
{
    public class CarData: ICarData
    {
        private readonly ManageDb _context;

        public CarData(ManageDb context)
        {
            _context = context;
        }

        public async Task<List<Car>> FetchCars()
        {
            var cars = await _context.Cars.ToListAsync();
            return cars;
        }

        public async Task<Car> FetchCarById(Guid id)
        {
            var car = await _context.Cars.FindAsync(id);
            return car ?? new Car();
        }

        public async Task BookCar(BookedCar car)
        {
            await _context.BookedCars.AddAsync(car);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBookedCar(BookedCar bookedCar)
        {
            var bookedCarToUpdate = await _context.BookedCars.FindAsync(bookedCar.BookingId);

            if (bookedCarToUpdate != null)
            {
                bookedCarToUpdate.FromDate = bookedCar.FromDate;
                bookedCarToUpdate.ToDate = bookedCar.ToDate;
            }

            await _context.SaveChangesAsync();
        }

        public async Task DeleteBookedCar(Guid bookingId)
        {
            var bookedCarToDelete = await _context.BookedCars.FindAsync(bookingId);

            if(bookedCarToDelete != null)
                _context.BookedCars.Remove(bookedCarToDelete);

            await _context.SaveChangesAsync();
        }

        public async Task<List<BookedCar>> FetchBookedCars()
        {
            var bookedCars = await _context.BookedCars.ToListAsync();
            return bookedCars;
        }

        public async Task<List<Maker>> FetchCarMakers()
        {
            var makers = await _context.Makers.ToListAsync();
            return makers;
        }
    }
}
