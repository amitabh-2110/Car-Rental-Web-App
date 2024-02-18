using BusinessObjectLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.DTO
{
    public class CarInfoDto
    {
        public Car CarInfo { get; set; }

        public List<BookedCar> BookedCarInfo { get; set; }
    }
}
