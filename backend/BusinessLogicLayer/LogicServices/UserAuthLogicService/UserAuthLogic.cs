using BusinessObjectLayer.Models;
using DataAccessLayer.DataServices.UserAuthDataService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.LogicServices.UserAuthLogicService
{
    public class UserAuthLogic: IUserAuthLogic
    {
        private readonly IUserAuthData _userAuthData;

        public UserAuthLogic(IUserAuthData userAuthData)
        {
            _userAuthData = userAuthData;
        }

        public async Task<bool> AuthenticateUser(string userName, string password)
        {
            var isAuth = await _userAuthData.AuthenticateUser(userName, password);
            return isAuth;
        }

        public async Task<User> FetchUser(string username)
        {
            var user = await _userAuthData.FetchUserById(username);
            return user;
        }
    }
}
