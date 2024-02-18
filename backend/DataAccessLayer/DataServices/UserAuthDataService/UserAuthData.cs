using BusinessObjectLayer.Data;
using BusinessObjectLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.DataServices.UserAuthDataService
{
    public class UserAuthData: IUserAuthData
    {
        private readonly ManageDb _context;

        public UserAuthData(ManageDb context)
        {
            _context = context;
        }

        public async Task<bool> AuthenticateUser(string username, string password)
        {
            var userFound = await _context.Users.FindAsync(username);

            if (userFound != null)
                return userFound.Password == password;

            return false;
        }

        public async Task<User> FetchUserById(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            return user;
        }
    }
}
