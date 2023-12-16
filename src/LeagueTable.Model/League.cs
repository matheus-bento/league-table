using System.ComponentModel.DataAnnotations;

namespace LeagueTable.Model
{
    /// <summary>
    ///     Represents a league table
    /// </summary>
    public class League
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = null!;

        public ICollection<Team> Teams { get; set; } = new List<Team>();
    }
}