using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudVanillaJs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        public ActionResult Get()
        {
            using (Models.CrudVanillaJsContext db = new Models.CrudVanillaJsContext())
            {
                var lst = (from d in db.Personas
                           select d).ToList();

                return Ok(lst);
            }

        }
    }
}
