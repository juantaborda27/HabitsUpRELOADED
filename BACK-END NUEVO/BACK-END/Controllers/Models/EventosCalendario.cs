using System.ComponentModel.DataAnnotations;

namespace BACK_END.Controllers.Models
{
    public class EventosCalendario
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Titulo { get; set; }
        [MaxLength(500)]
        public string Descripcion { get; set; }
        [Required]
        public DateTime Fecha { get; set; }
        [Required]
        public TimeSpan Hora { get; set; }
        [Required]
        public string Frecuencia { get; set; }
        public int? DiasDeRepeticion { get; set; }
        public bool Recordatorio { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaActualizacion { get; set; }
    }
}
