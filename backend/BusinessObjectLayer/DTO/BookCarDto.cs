using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.DTO
{
    public class BookCarDto
    {
        public string UserId { get; set; }

        public string VehicleId { get; set; }

        public string FromDate { get; set; }

        public string ToDate { get; set; }
    }
}
