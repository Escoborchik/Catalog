using Catalog.Models;

namespace Catalog.Interfaces
{
    public interface ITeam
    {
        string[] GetTeamsName(string prefix);

        Team GetTeamByNameOrCreate(string teamName);
    }
}
