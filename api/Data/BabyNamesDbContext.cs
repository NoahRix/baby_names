using Microsoft.EntityFrameworkCore;
using BabyNamesApi.Models;

namespace BabyNamesApi.Data
{
    public class BabyNamesDbContext : DbContext
    {
        public BabyNamesDbContext(DbContextOptions<BabyNamesDbContext> options)
            : base(options)
        {
        }

        public DbSet<BabyName> BabyNames { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Composite Primary Key Configuration
            modelBuilder.Entity<BabyName>()
                .HasKey(b => new { b.StateCode, b.FirstName, b.GenderCode, b.BirthYear, b.NameCount });

            // Length speficications
            modelBuilder.Entity<BabyName>()
                .Property(b => b.StateCode).HasMaxLength(10);
            modelBuilder.Entity<BabyName>()
                .Property(b => b.FirstName).HasMaxLength(100);
            modelBuilder.Entity<BabyName>()
                .Property(b => b.GenderCode).HasMaxLength(1);
        }
    }
}
