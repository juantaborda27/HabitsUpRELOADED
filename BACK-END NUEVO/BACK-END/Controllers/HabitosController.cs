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
    public class HabitosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HabitosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: /api/noasociados
        [HttpGet("/api/Habitos/asociados")]
        public async Task<ActionResult<IEnumerable<Habitos>>> GetHabitos()
        {
            var habitos = await _context.Habitos
                                        .Where(h => h.UsuarioId != null)
                                        .Include(h => h.Productividad)
                                        .ToListAsync();

            // Devolviendo los hábitos con los datos de productividad asociados
            return Ok(habitos);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Habitos>>> GetHabitosAsociados()
        {
            var habitos = await _context.Habitos
                                        .Where(h => h.UsuarioId == null)
                                        .Include(h => h.Productividad)  
                                        .ToListAsync();

            // Devolviendo los hábitos con los datos de productividad asociados
            return Ok(habitos);
        }

        // GET: api/Habitos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Habitos>> GetHabitos(int id)
        {
            var habitos = await _context.Habitos.FindAsync(id);

            if (habitos == null)
            {
                return NotFound();
            }

            return habitos;
        }

        [HttpPut("/actualizarHabito/{id}")]
        public async Task<IActionResult> PutHabitos(int id, HabitoActualizar updateRequest)
        {
            // Validamos que el id sea válido
            if (id <= 0)
            {
                return BadRequest("Id no es válido.");
            }

            // Buscamos el hábito en la base de datos
            var habito = await _context.Habitos.FindAsync(id);

            // Si no se encuentra el hábito, retornamos 404
            if (habito == null)
            {
                return NotFound("Hábito no encontrado.");
            }

            // Actualizamos las propiedades del hábito
            habito.Nombre = updateRequest.Nombre;
            habito.Descripcion = updateRequest.Descripcion;
            habito.Frecuencia = updateRequest.Frecuencia;
            habito.Hora = updateRequest.Hora;
            habito.diasRepeticiones = updateRequest.diasRepeticiones;
            habito.Recordatorio = updateRequest.Recordatorio;
            habito.fechaCreacion = updateRequest.fechaCreacion;
            habito.ProductividadId = updateRequest.ProductividadId;

            // Indicamos que todas las propiedades se han modificado
            _context.Entry(habito).State = EntityState.Modified;

            try
            {
                // Guardamos los cambios en la base de datos
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HabitosExists(id))
                {
                    return NotFound("Hábito no encontrado.");
                }
                else
                {
                    throw; // Lanza el error si es un error inesperado
                }
            }

            return NoContent();
        }

        // PUT: api/Habitos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHabitos(int id, actualizarHabito updateRequest)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            var habito = await _context.Habitos.FindAsync(id);
            if (habito == null)
            {
                return NotFound();
            }

            habito.UsuarioId = updateRequest.UsuarioId;

            _context.Entry(habito).Property(h => h.UsuarioId).IsModified = true;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HabitosExists(id))
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


        // POST: api/Habitos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Habitos>> PostHabitos([FromBody] Habitos habitDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); 
            }

            var habito = new Habitos
            {
                Nombre = habitDto.Nombre,
                Descripcion = habitDto.Descripcion,
                Frecuencia = habitDto.Frecuencia,
                Hora = habitDto.Hora,
                diasRepeticiones = habitDto.diasRepeticiones,
                ProductividadId = habitDto.ProductividadId,
                Recordatorio = habitDto.Recordatorio,
                fechaCreacion = habitDto.fechaCreacion,
                UsuarioId = habitDto.UsuarioId,
            };

            _context.Habitos.Add(habito);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHabitos), new { id = habito.Id }, habito);
        }

        [HttpPost("/añadirHabito")]
        public async Task<ActionResult<Habitos>> PostHabitos([FromBody] HabitoActualizar habitDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var habito = new Habitos
            {
                Nombre = habitDto.Nombre,
                Descripcion = habitDto.Descripcion,
                Frecuencia = habitDto.Frecuencia,
                Hora = habitDto.Hora,
                diasRepeticiones = habitDto.diasRepeticiones,
                Recordatorio = habitDto.Recordatorio,
                fechaCreacion = habitDto.fechaCreacion,
                ProductividadId = habitDto.ProductividadId,  
                UsuarioId = 1,     
            };

            _context.Habitos.Add(habito);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetHabitos), new { id = habito.Id }, habito);
        }

        // DELETE: api/Habitos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHabitos(int id)
        {
            var habitos = await _context.Habitos.FindAsync(id);
            if (habitos == null)
            {
                return NotFound();
            }

            var historialHabitos = _context.HistorialHabitos.Where(h => h.HabitosId == id);
            _context.HistorialHabitos.RemoveRange(historialHabitos);

            // Luego eliminar el hábito
            _context.Habitos.Remove(habitos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HabitosExists(int id)
        {
            return _context.Habitos.Any(e => e.Id == id);
        }
    }
}
