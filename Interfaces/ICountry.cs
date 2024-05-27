using Catalog.Models;

namespace Catalog.Interfaces
{
    public interface ICountry
    {
        Country GetCountry(string name);
        Country[] GetAll();
    }
}
