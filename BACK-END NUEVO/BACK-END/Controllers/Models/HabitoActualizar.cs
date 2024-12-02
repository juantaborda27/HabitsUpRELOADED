namespace BACK_END.Controllers.Models
{
    public class HabitoActualizar
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Descripcion { get; set; }
        public required string Frecuencia { get; set; }
        public required TimeSpan Hora { get; set; }
        public required int diasRepeticiones { get; set; }
        public required bool Recordatorio { get; set; }
        public DateTime fechaCreacion { get; set; } = DateTime.Now;
        public required int ProductividadId { get; set; }
        public bool? Calendario { get; set; }
    }
}
