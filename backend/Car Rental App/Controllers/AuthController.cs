using BusinessLogicLayer.LogicServices.TokenLogicService;
using BusinessLogicLayer.LogicServices.UserAuthLogicService;
using BusinessObjectLayer.DTO;
using BusinessObjectLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Car_Rental_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserAuthLogic _userAuthLogic;
        private readonly ITokenLogic _tokenLogic;

        //public IUserAuthLogic _userAuthLogic { get; }

        public AuthController(IUserAuthLogic userAuthLogic, ITokenLogic tokenLogic)
        {
            _userAuthLogic = userAuthLogic;
            _tokenLogic = tokenLogic;
        }

        [HttpPost, AllowAnonymous]
        public async Task<ActionResult> Login([FromBody] Login person)
        {
            bool isAuth = await _userAuthLogic.AuthenticateUser(person.UserId, person.Password);

            if (!isAuth)
            {
                return new JsonResult(new
                {
                    statusCode = 400,
                    message = "Wrong credentials"
                });
            }

            var userInfo = await _userAuthLogic.FetchUser(person.UserId);
            var token = _tokenLogic.CreateToken(userInfo.UserId, userInfo.Role);

            return new JsonResult(new
            {
                token,
                message = "User authenticated successfully",
                statusCode = 200
            });
        }

        [HttpGet, Authorize]
        public async Task<ActionResult> FetchUser()
        {
            string userId = User.FindFirstValue(ClaimTypes.Email);
            var user = await _userAuthLogic.FetchUser(userId);

            return new JsonResult(new
            {
                user,
                message = "success",
                statusCode = 200
            });
        }
    }
}
