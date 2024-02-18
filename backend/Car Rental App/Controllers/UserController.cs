using BusinessLogicLayer.LogicServices.CarLogicService;
using BusinessObjectLayer.DTO;
using BusinessObjectLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Car_Rental_App.Controllers
{
    [Route("api/[controller]"), Authorize(Roles = "user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ICarLogic _carLogic;

        public UserController(ICarLogic carLogic)
        {
            _carLogic = carLogic;
        }

        [HttpGet]
        public async Task<ActionResult> FetchBookedCars(string userId)
        {
            var bookedCars = await _carLogic.BookedCarInfoByUserId(userId);
            return Ok(bookedCars);
        }

        [HttpPut]
        public async Task<ActionResult> RequestReturn(string bookingId)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            await _carLogic.RequestReturnCar(bookingId);

            return new JsonResult(new
            {
                statusCode = 200,
                message = "Request for return made sucessfully"
            });
        }

        [HttpPost]
        public async Task<ActionResult> BookCar([FromBody] BookCarDto car)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _carLogic.BookCar(car);

            return new JsonResult(new
            {
                statusCode = 200,
                message = "Car booked successfully"
            });
        }
    }
}
