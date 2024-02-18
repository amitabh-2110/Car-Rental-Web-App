using BusinessObjectLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataServices.UserAuthDataService
{
    public interface IUserAuthData
    {
        public Task<bool> AuthenticateUser(string username, string password);

        public Task<User> FetchUserById(string userId);
    }
}
