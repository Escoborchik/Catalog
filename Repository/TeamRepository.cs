using Catalog.Interfaces;
using Catalog.Models;

namespace Catalog.Repository
{
    public class TeamRepository : ITeam
    {
        private readonly DataBase _dataBase;
        public TeamRepository(DataBase dataBase)
        {
            _dataBase = dataBase;
        }

        public Team GetTeamByNameOrCreate(string teamName)
        {
            var team = _dataBase.Teams.FirstOrDefault(t => t.Name == teamName);

            if (team is null)
            {
                team = new Team() { Name = teamName };
                _dataBase.Teams.Add(team);
                _dataBase.SaveChanges();                
            }
            return team;
                     
        }

        public string[] GetTeamsName(string prefix)
        {             
            return _dataBase.Teams.
                Where(team => team.Name.StartsWith(prefix) || team.Name.Contains(prefix)).
                Select(x => x.Name).ToArray();
        }
    }
}
