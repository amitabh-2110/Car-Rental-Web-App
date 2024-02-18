using BusinessObjectLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.LogicServices.UserAuthLogicService
{
    public interface IUserAuthLogic
    {
        public Task<bool> AuthenticateUser(string username, string password);

        public Task<User> FetchUser(string username);
    }
}
