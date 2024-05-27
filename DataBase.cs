using Catalog.Models;
using Microsoft.EntityFrameworkCore;

namespace Catalog
{
    public class DataBase : DbContext
    {
        public DbSet<Player> Players { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Country> Countries { get; set; }

        public DataBase(DbContextOptions<DataBase> options) :base(options) 
        {   
            Database.EnsureCreated();
        }               

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Player>()
                .HasOne(p => p.Team);

            modelBuilder.Entity<Player>()
                .HasOne(p => p.Country);

            modelBuilder.Entity<Country>().HasData(
                new Country { Id = 1, Name = "Russia" },
                new Country { Id = 2, Name = "Italy"},
                new Country { Id = 3, Name = "USA" }
        );
        }
        
    }
}
