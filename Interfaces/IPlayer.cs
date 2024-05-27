using Catalog.Models;

namespace Catalog.Interfaces
{
    public interface IPlayer
    {
        void RegisterPlayer(Player player);

        Player[] GetPlayers(int page, int min);

        void UpdatePlayer(Player player);

        Player GetPlayer(int id);
    }
}
