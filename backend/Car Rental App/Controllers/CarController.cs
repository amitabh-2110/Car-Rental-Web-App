using BusinessLogicLayer.LogicServices.CarLogicService;
using BusinessObjectLayer.DTO;
using BusinessObjectLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Car_Rental_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : Controller
    {
        // It is a private field.
        // private readonly ICarLogic _carLogic;

        /*
         * The below is a auto-implemented property - property remains immutable except for constructor.
         * When a property is created an anonymous private instance backing field is created.
         **/
        public ICarLogic _carLogic { get; } 

        public CarController(ICarLogic carLogic)
        {
            _carLogic = carLogic;
        }

        [HttpGet, AllowAnonymous]
        public async Task<ActionResult> FetchCars()
        {
            var cars = await _carLogic.FetchCars();
            return Ok(cars);
        }

        [HttpGet, AllowAnonymous]
        [Route("fetch-car-id")]
        public async Task<ActionResult> FetchCarById(string carId)
        {
            Guid id = new Guid(carId);
            var car = await _carLogic.FetchCarById(id);
            var carBookingInfo = await _carLogic.BookedCarInfoByCarId(id);

            var carInfo = new CarInfoDto
            {
                CarInfo = car,
                BookedCarInfo = carBookingInfo,
            };

            return Ok(carInfo);
        }

        [HttpGet, AllowAnonymous]
        [Route("fetch-makers")]
        public async Task<ActionResult> FetchCarMakers()
        {
            var makers = await _carLogic.FetchCarMakers();
            return Ok(makers);
        }

        [HttpGet, AllowAnonymous]
        [Route("filter-car")]
        public async Task<ActionResult> FetchFilteredCar(string maker, string? model)
        {
            var cars = await _carLogic.FilterCarByMakerModelSearch(maker, model ?? "");
            return Ok(cars);
        }

        [HttpGet, Authorize]
        [Route("fetch-booked-car-id")]
        public async Task<ActionResult> FetchBookedCarById(string bookingId)
        {
            var bookedCar = await _carLogic.FetchBookedCarById(bookingId);
            return new JsonResult(new
            {
                StatusCode = 200,
                bookedCar
            });
        }
    }
}
