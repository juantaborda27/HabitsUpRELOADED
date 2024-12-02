using System.Text.Json.Serialization;

namespace BACK_END.Controllers.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Correo { get; set; } = null!; 
        public string Contraseña { get; set; } = null!; 
        public DateTime FechaCreacion { get; set; } = DateTime.Now;
        [JsonIgnore]
        public ICollection<Habitos>? Habitos { get; set; }
    }
}
