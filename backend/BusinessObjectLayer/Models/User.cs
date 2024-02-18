using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.Models
{
    public class User
    {
        public string UserId { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }
    }
}
