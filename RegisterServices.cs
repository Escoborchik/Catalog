using Catalog.Interfaces;
using Catalog.Repository;
using Microsoft.EntityFrameworkCore;

namespace Catalog
{
    public static class RegisterServices
    {
        public static void RegisterAppServices(this IServiceCollection services,string connection)
        {
            services.AddControllersWithViews();
            services.AddDbContext<DataBase>(options => options.UseNpgsql(connection));
            services.AddTransient<ITeam, TeamRepository>();
            services.AddTransient<IPlayer, PlayerRepository>();
            services.AddTransient<ICountry, CountryRepository>();
            services.AddSignalR();
        }
    }
}
