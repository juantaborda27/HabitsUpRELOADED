namespace BACK_END.Controllers.Models
{
    public class HabitoCalendario
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Descripcion { get; set; }
        public required string Frecuencia { get; set; }
        public required TimeSpan Hora { get; set; }
        public required int diasRepeticiones { get; set; }
        public required bool Recordatorio { get; set; }
        public DateTime fechaCreacion { get; set; }
        public required int ProductividadId { get; set; }
    }
}
