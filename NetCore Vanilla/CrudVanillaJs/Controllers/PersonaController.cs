using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudVanillaJs.Controllers
{
    [EnableCors("Permitir")]
    [Route("api/[controller]")]
    [ApiController]

    public class PersonaController : ControllerBase
    {
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

        [HttpPost]
        public ActionResult Post([FromBody] Models.Request.PersonRequest model)
        {
            using (Models.CrudVanillaJsContext db = new Models.CrudVanillaJsContext())
            {
                Models.Persona oPerson = new Models.Persona();
                oPerson.Nombre = model.Nombre;
                oPerson.Edad = model.Edad;
                db.Personas.Add(oPerson);
                db.SaveChanges();
            }
            return Ok();
        }


        [HttpPut]
        public ActionResult Put([FromBody] Models.Request.PersonEditRequest model)
        {
            using (Models.CrudVanillaJsContext db = new Models.CrudVanillaJsContext())
            {
                Models.Persona oPerson = db.Personas.Find(model.Id);
                oPerson.Nombre = model.Nombre;
                oPerson.Edad = model.Edad;
                db.Entry(oPerson).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                db.SaveChanges();
            }
            return Ok();
        }


        [HttpDelete]
        public ActionResult Delete([FromBody] Models.Request.PersonEditRequest model)
        {
            using (Models.CrudVanillaJsContext db = new Models.CrudVanillaJsContext())
            {
                Models.Persona oPerson = db.Personas.Find(model.Id);
                db.Personas.Remove(oPerson);
                db.SaveChanges();
            }
            return Ok();
        }
    }
}