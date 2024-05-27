using Catalog.Interfaces;
using Catalog.Models;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Repository
{
    public class PlayerRepository : IPlayer
    {
        private readonly DataBase _dataBase;
        public PlayerRepository(DataBase dataBase)
        {
            _dataBase = dataBase;
        }

        public Player GetPlayer(int id)
        {
           return _dataBase.Players.Where(p => p.Id == id).FirstOrDefault();
        }
        public Player[] GetPlayers(int page, int min)
        {
            return _dataBase.Players.
                Include(c => c.Country).
                Include(t => t.Team).ToArray();
        }

        public void RegisterPlayer(Player player)
        {
            _dataBase.Players.Add(player);
            _dataBase.SaveChanges();
        }

        public void UpdatePlayer(Player player)
        {
            _dataBase.Players.Update(player);
            _dataBase.SaveChanges();
        }
    }
}
