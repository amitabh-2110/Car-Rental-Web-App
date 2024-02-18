using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.Models
{
    public class BookedCar
    {
        public Guid BookingId { get; set; }

        public string UserId { get; set; }

        public Guid VehicleId { get; set; }

        public string FromDate { get; set; }

        public string ToDate { get; set; }

        public bool IsRequest { get; set; }

        public bool IsApproved { get; set; }
    }
}
