using System.ComponentModel.DataAnnotations;

namespace LeagueTable.Model
{
    public class Team
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Name { get; set; } = null!;

        public int LeagueId { get; set; }
    }
}