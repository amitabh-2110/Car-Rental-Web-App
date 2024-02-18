using BusinessObjectLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessObjectLayer.Data
{
    public class ManageDb: DbContext
    {
        public ManageDb(DbContextOptions options): base(options) { }
        
        public DbSet<Car> Cars { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<BookedCar> BookedCars { get; set; }
        public DbSet<Maker> Makers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Car>()
                .HasKey(p => p.VehicleId);
            modelBuilder.Entity<Car>()
                .Property(p => p.RentalPrice)
                .HasPrecision(18, 2);

            modelBuilder.Entity<User>()
                .HasKey(p => p.UserId);

            modelBuilder.Entity<BookedCar>()
                .HasKey(p => p.BookingId);

            modelBuilder.Entity<Maker>()
                .HasKey(p => p.MakerId);
            modelBuilder.Entity<Maker>()
                .Property(p => p.MakerId)
                .ValueGeneratedOnAdd();
        }
    }
}
