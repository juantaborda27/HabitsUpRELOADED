using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BACK_END.Context;
using BACK_END.Controllers.Models;

namespace BACK_END.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductividadController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductividadController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Productividad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Productividad>>> GetProductividad()
        {
            return await _context.Productividad.ToListAsync();
        }

        // GET: api/Productividad/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Productividad>> GetProductividad(int id)
        {
            var productividad = await _context.Productividad.FindAsync(id);

            if (productividad == null)
            {
                return NotFound();
            }

            return productividad;
        }

        // PUT: api/Productividad/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductividad(int id, Productividad productividad)
        {
            if (id != productividad.Id)
            {
                return BadRequest();
            }

            _context.Entry(productividad).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductividadExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Productividad
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Productividad>> PostProductividad(Productividad productividad)
        {
            _context.Productividad.Add(productividad);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductividad", new { id = productividad.Id }, productividad);
        }

        // DELETE: api/Productividad/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductividad(int id)
        {
            var productividad = await _context.Productividad.FindAsync(id);
            if (productividad == null)
            {
                return NotFound();
            }

            _context.Productividad.Remove(productividad);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductividadExists(int id)
        {
            return _context.Productividad.Any(e => e.Id == id);
        }
    }
}
