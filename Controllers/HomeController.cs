using Microsoft.AspNetCore.Mvc;
using Catalog.Interfaces;

namespace Catalog.Controllers
{
    public class HomeController : Controller
    {
        private readonly ICountry _country;


        public HomeController(ICountry country)
        {
            _country = country;
        }       
        public IActionResult NewPlayer()
        {
            var res = _country.GetAll();
            return View(res);
        }                

        public IActionResult PlayerList()
        {
            var res = _country.GetAll();
            return View(res);
        }
    }
}
