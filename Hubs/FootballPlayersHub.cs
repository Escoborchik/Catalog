using Microsoft.AspNetCore.SignalR;

namespace Catalog.Hubs
{
    public class FootballPlayersHub : Hub
    {
        public async Task RegisterNewPlayer(string id, string firstName, string secondName, string sex,
                                            string birthDate, string teamName, string country)
        {
            await Clients.Caller.SendAsync("showNewPlayer", id, firstName, secondName, sex == "0" ? "Мужчина" : "Женщина", birthDate, teamName, country);
        }
        public async Task UpdatePlayer(string id, string firstName, string secondName, string sex,
                                            string birthDate, string teamName, string country)
        {
            await Clients.Caller.SendAsync("updatePlayer", id, firstName, secondName, sex == "0" ? "Мужчина" : "Женщина", birthDate, teamName, country);
        }

    }
}
