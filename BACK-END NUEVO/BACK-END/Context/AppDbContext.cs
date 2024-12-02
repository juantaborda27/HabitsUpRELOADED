using BACK_END.Controllers.Models;
using Microsoft.EntityFrameworkCore;

namespace BACK_END.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
            
        }

        public DbSet<Habitos> Habitos { get; set; }
        public DbSet<HistorialHabitos> HistorialHabitos { get; set; }
        public DbSet<HistorialHabitosDTO> HistorialHabitosDTO { get; set; }
        public DbSet<HabitoActualizar> HabitoActualizar { get; set; }
        public DbSet<HabitoCalendario> HabitoCalendario { get; set; }
        public DbSet<Productividad> Productividad { get; set; }
        public DbSet<BACK_END.Controllers.Models.Usuario> Usuario { get; set; } = default!;
    }
}
