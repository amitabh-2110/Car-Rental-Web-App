using BusinessLogicLayer.LogicServices.CarLogicService;
using BusinessObjectLayer.DTO;
using BusinessObjectLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Car_Rental_App.Controllers
{
    [Route("api/[controller]"), Authorize(Roles = "admin")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly ICarLogic _carLogic;

        public AdminController(ICarLogic carLogic)
        {
            _carLogic = carLogic;
        }

        [HttpGet]
        public async Task<ActionResult> FetchBookedCars()
        {
            var cars = await _carLogic.FetchBookedCars();
            return Ok(cars);
        }

        [HttpGet]
        [Route("return-request")]
        public async Task<ActionResult> FetchBookedCarsForReturn()
        {
            var cars = await _carLogic.FetchBookedCarsForReturn();
            return Ok(cars);
        }

        [HttpPut]
        public async Task<ActionResult> RequestApprove(string bookingId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _carLogic.RequestApprove(bookingId);

            return new JsonResult(new
            {
                statusCode = 200,
                message = "Request approved sucessfully"
            });
        }

        [HttpPut]
        [Route("update-booked-car")]
        public async Task<ActionResult> UpdateBookedCar(UpdateBookedCarDto bookedCar)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _carLogic.UpdateBookedCar(bookedCar);

            return new JsonResult(new
            {
                statusCode = 200,
                message = "Updated successfully"
            });
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteBookedCar(string carId)
        {
            if(carId != "")
            {
                Guid id = new Guid(carId);
                await _carLogic.DeleteBookedCar(id);
                return Ok(ModelState);
            }

            return BadRequest();
        }
    }
}
