using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.Models
{
    public class Car
    {
        public Guid VehicleId { get; set; }

        public int Maker { get; set; }

        public string Model { get; set; }

        public decimal RentalPrice { get; set; }

        public string FuelType { get; set; }

        public string TransmissionType { get; set; }

        public int Quantity { get; set; }
    }
}
