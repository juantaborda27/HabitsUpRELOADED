namespace BACK_END.Controllers.Models
{
    public class HistorialHabitos
    {
        public int Id { get; set; }
        public int? HabitosId { get; set; }
        public DateTime? fechaCompletado { get; set; }
        public int? Racha { get; set; }
        public bool? Recordatorio { get; set; }
        public Habitos? Habitos { get; set; }
    }
}
