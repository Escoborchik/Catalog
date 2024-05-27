using Microsoft.AspNetCore.Mvc;
using Catalog.Models;
using Catalog.Interfaces;
using Catalog.DTO;

namespace Catalog.Controllers
{
    public class FootballPlayersController : Controller
    {
        private readonly ITeam _team;
        private readonly IPlayer _player;
        private readonly ICountry _country;

        public FootballPlayersController(ITeam team, IPlayer player, ICountry country)
        {
            _team = team;
            _player = player;
            _country = country;
        }

        [HttpPost]
        public JsonResult GetTeamName(string Prefix)
        {
            var res = _team.GetTeamsName(Prefix);
            return Json(res);
        }

        [HttpPost]
        public JsonResult RegisterNewPlayer([FromBody] PlayerData pl)
        {
            Player player = new()
            {
                FirstName = pl.FirstName,
                LastName = pl.LastName,
                IsMale = pl.IsMale,
                BirthDate = pl.BirthDate,
                Country = _country.GetCountry(pl.Country),
                Team = _team.GetTeamByNameOrCreate(pl.Team)
            };
            _player.RegisterPlayer(player);
            return Json(new string[] { "OK", player.Id.ToString() });
        }

        [HttpPost]
        public JsonResult RequestPlayersPage(int page, int min)
        {            
            var result = _player.GetPlayers(page, min);

            return Json(new Dictionary<string, object> { { "Available", result.Length }, { "Result", result.Reverse().
                Skip(min * (page - 1)).Take(min).ToArray() } });
        }        

        [HttpPost]
        public JsonResult UpdatePlayer(int id,string firstName,string lastName,int sex,DateOnly birthDate,string country, string team)
        {
            Player player = _player.GetPlayer(id);
            player.FirstName = firstName;
            player.LastName = lastName;
            player.IsMale = sex == 0;
            player.BirthDate = birthDate;
            player.Country = _country.GetCountry(country);            
            player.Team = _team.GetTeamByNameOrCreate(team);
            _player.UpdatePlayer(player);
            return Json(new string[] { "OK", player.Id.ToString() });
        }
    }
}
