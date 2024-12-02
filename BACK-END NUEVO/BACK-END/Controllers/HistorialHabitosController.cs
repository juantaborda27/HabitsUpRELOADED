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
    public class HistorialHabitosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HistorialHabitosController(AppDbContext context)
        {
            _context = context;
        }
        //Obtener Todos
        // GET: api/HistorialHabitos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HistorialHabitos>>> GetHistorialHabitos()
        {
            return await _context.HistorialHabitos.ToListAsync();
        }
        // api con filtro con solo los que tengan la fecha de hoy
        [HttpGet("Hoy")]
        public async Task<ActionResult<IEnumerable<HistorialHabitos>>> GetHistorialHabitosHoy()
        {
            // Obtener la fecha de hoy sin la parte de la hora
            var today = DateTime.Today;

            // Filtrar los registros cuya fecha sea igual a hoy
            var historialHabitosHoy = await _context.HistorialHabitos
                .Where(h => h.fechaCompletado.HasValue && h.fechaCompletado.Value.Date == today)
                .ToListAsync();

            if (historialHabitosHoy == null || !historialHabitosHoy.Any())
            {
                return NotFound("No se encontraron hábitos para el día de hoy.");
            }

            return Ok(historialHabitosHoy);
        }
        // Api para racha de actual
        [HttpGet("RachaHoy")]
        public async Task<ActionResult<int>> GetSumaRachaHoy()
        {
            var today = DateTime.Today;

            var sumaRachaHoy = await _context.HistorialHabitos
                .Where(h => h.fechaCompletado.HasValue && h.fechaCompletado.Value.Date == today)
                .SumAsync(h => h.Racha ?? 0); 

            return Ok(sumaRachaHoy);
        }
        // Top habitos por dias de Racha
        [HttpGet("TopHabitosPorRacha")]
        public async Task<ActionResult<IEnumerable<HistorialHabitos>>> GetTopHabitosPorRacha()
        {
            var topHabitosPorRacha = await _context.HistorialHabitos
                .Where(h => h.Racha.HasValue) 
                .OrderByDescending(h => h.Racha)
                .Take(5) 
                .ToListAsync();

            return Ok(topHabitosPorRacha);
        }



        //Obtener por id
        // GET: api/HistorialHabitos/5
        [HttpGet("{HabitosId}")]
        public async Task<ActionResult<HistorialHabitos>> GetHistorialHabitos(int HabitosId)
        {
            var historialHabitos = await _context.HistorialHabitos
                                                 .Where(h => h.HabitosId == HabitosId)
                                                 .FirstOrDefaultAsync();

            if (historialHabitos == null)
            {
                return NotFound();
            }

            return historialHabitos;
        }

        //Actualizar POR iD
        // PUT: api/HistorialHabitos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{HabitosId}")]
        public async Task<IActionResult> PutHistorialHabitos(int HabitosId, HistorialHabitosDTO historialHabitosDto)
        {
            // Verificar que el HabitosId proporcionado coincida con el HabitosId en el DTO
            if (HabitosId != historialHabitosDto.HabitosId)
            {
                return BadRequest("El HabitosId proporcionado no coincide con el HabitosId del historial de hábitos.");
            }

            // Buscar el registro existente por HabitosId
            var historialHabitos = await _context.HistorialHabitos
                                                 .Where(h => h.HabitosId == HabitosId)
                                                 .FirstOrDefaultAsync();

            if (historialHabitos == null)
            {
                return NotFound("El historial de hábitos no existe.");
            }

            // Actualizar solo la racha
            if (historialHabitosDto.Racha.HasValue)
            {
                historialHabitos.Racha = historialHabitosDto.Racha.Value;
            }
            else
            {
                return BadRequest("El valor de la racha es obligatorio.");
            }

            historialHabitos.fechaCompletado = DateTime.Now;

            // Marcar como modificado
            _context.Entry(historialHabitos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HistorialHabitosExists(HabitosId))
                {
                    return NotFound("El historial de hábitos ya no existe.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/HistorialHabitos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HistorialHabitos>> PostHistorialHabitos(HistorialHabitos historialHabitos)
        {
            // Verificar si el HabitoId es válido
            if (historialHabitos.HabitosId == null)
            {
                return BadRequest("El HabitoId es requerido.");
            }

            // Verificar si el HabitoId existe en la base de datos antes de agregar el historial
            var habitoExistente = await _context.Habitos.FindAsync(historialHabitos.HabitosId);
            if (habitoExistente == null)
            {
                return NotFound("El hábito especificado no existe.");
            }

            // Buscar el historial existente para actualizar
            var historialExistente = await _context.HistorialHabitos
                .FirstOrDefaultAsync(h => h.Id == historialHabitos.Id);

            if (historialExistente == null)
            {
                return NotFound("El historial no existe.");
            }

            // Actualizar solo los campos necesarios de HistorialHabitos
            historialExistente.HabitosId = historialHabitos.HabitosId;
            historialExistente.fechaCompletado = historialHabitos.fechaCompletado;
            historialExistente.Racha = historialHabitos.Racha;
            historialExistente.Recordatorio = historialHabitos.Recordatorio;

            // Guardar los cambios
            await _context.SaveChangesAsync();

            // Retornar el objeto actualizado
            return Ok(historialExistente);
        }

        [HttpPost ("/api/agregarHistorial")]
        public async Task<ActionResult<HistorialHabitos>> PostHistorialHabitos(HistorialHabitosDTO historialHabitosDTO)
        {
            // Verificar si el HabitoId es válido
            if (historialHabitosDTO.HabitosId == null)
            {
                return BadRequest("El HabitoId es requerido.");
            }

            // Verificar si el HabitoId existe en la base de datos antes de agregar el historial
            var habitoExistente = await _context.Habitos.FindAsync(historialHabitosDTO.HabitosId);

            if (habitoExistente == null)
            {
                return NotFound("El hábito especificado no existe.");
            }

            // Crear un nuevo objeto HistorialHabitos a partir del DTO
            var historialHabitos = new HistorialHabitos
            {
                HabitosId = historialHabitosDTO.HabitosId,
                fechaCompletado = historialHabitosDTO.fechaCompletado,
                Racha = historialHabitosDTO.Racha,
                Recordatorio = historialHabitosDTO.Recordatorio
            };

            // Agregar el nuevo historial a la base de datos
            _context.HistorialHabitos.Add(historialHabitos);
            await _context.SaveChangesAsync();

            // Retornar el objeto creado
            return CreatedAtAction("GetHistorialHabitos", new { id = historialHabitos.Id }, historialHabitos);
        }


        // DELETE: api/HistorialHabitos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHistorialHabitos(int id)
        {
            var historialHabitos = await _context.HistorialHabitos.FindAsync(id);
            if (historialHabitos == null)
            {
                return NotFound();
            }

            _context.HistorialHabitos.Remove(historialHabitos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HistorialHabitosExists(int id)
        {
            return _context.HistorialHabitos.Any(e => e.Id == id);
        }
    }
}
