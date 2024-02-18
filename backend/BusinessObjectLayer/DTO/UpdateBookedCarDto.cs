using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.DTO
{
    public class UpdateBookedCarDto
    {
        public string BookingId { get; set;}

        public string FromDate { get; set;}

        public string ToDate { get; set;}
    }
}
