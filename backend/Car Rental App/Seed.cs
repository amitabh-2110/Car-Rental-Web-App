using BusinessObjectLayer.Data;
using BusinessObjectLayer.Models;

namespace Car_Rental_App
{
    public class Seed
    {
        private readonly ManageDb _context;

        public Seed(ManageDb context)
        {
            _context = context;
        }

        public void SeedDataContext()
        {
            if(!_context.Users.Any())
            {
                User adminUser = new User
                {
                    UserId = "admin@carstore.com",
                    Password = "@a1234",
                    Role = "admin"
                };

                User user1 = new User
                {
                    UserId = "user1@gmail.com",
                    Password = "@b1234",
                    Role = "user"
                };
                
                User user2 = new User
                {
                    UserId = "user2@gmail.com",
                    Password = "@c1234",
                    Role = "user"
                };

                _context.Users.Add(adminUser);
                _context.Users.Add(user1);
                _context.Users.Add(user2);
                _context.SaveChanges();
            }

            if(!_context.Makers.Any())
            {
                Maker maker1 = new Maker
                {
                    Name = "Hyundai",
                };

                Maker maker2 = new Maker
                {
                    Name = "Maruti",
                };

                Maker maker3 = new Maker
                {
                    Name = "Mahindra",
                };

                _context.Makers.Add(maker1);
                _context.Makers.Add(maker2);
                _context.Makers.Add(maker3);
                _context.SaveChanges();
            }

            if (!_context.Cars.Any())
            {
                var random = new Random();
                var carMaker = _context.Makers.ToList();
                List<Car> carsList = new List<Car>();

                List<string> fuelType = new List<string>
                {
                    "Petrol", "Diesel"
                };

                List<string> transmissionType = new List<string>
                {
                    "Manual", "Automatic"
                };

                for(int i = 0; i < 8; i++)
                {
                    int makerRandNum = random.Next(carMaker.Count);

                    Car car = new Car
                    {
                        VehicleId = Guid.NewGuid(),
                        Maker = makerRandNum,
                        Model = $"{carMaker[makerRandNum].Name}-model-{i}",
                        RentalPrice = (decimal)random.NextDouble()*(100-10)+10,
                        FuelType = fuelType[random.Next(fuelType.Count)],
                        TransmissionType = transmissionType[random.Next(transmissionType.Count)],
                        Quantity = 1
                    };

                    carsList.Add(car);
                }

                _context.Cars.AddRange(carsList);
                _context.SaveChanges();
            }
        }
    }
}
