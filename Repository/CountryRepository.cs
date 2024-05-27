using Catalog.Interfaces;
using Catalog.Models;

namespace Catalog.Repository
{
    public class CountryRepository : ICountry
    {
        private readonly DataBase _dataBase;
        public CountryRepository(DataBase dataBase)
        {
            _dataBase = dataBase;
        }
        public Country[] GetAll()
        {
            return _dataBase.Countries.ToArray();
        }

        public Country GetCountry(string name)
        {
            return _dataBase.Countries.Where(d => d.Name == name).FirstOrDefault();
        }
    }
}
