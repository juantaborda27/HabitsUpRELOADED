namespace BACK_END.Controllers.Models
{
    public class HistorialHabitosDTO
    {
        public int Id { get; set; }
        public int? HabitosId { get; set; }
        public DateTime? fechaCompletado { get; set; }
        public int? Racha { get; set; }
        public bool? Recordatorio { get; set; }
    }
}
