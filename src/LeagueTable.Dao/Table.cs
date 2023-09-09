using System.ComponentModel.DataAnnotations;

namespace LeagueTable.Dao
{
    /// <summary>
    ///     Represents a league table
    /// </summary>
    public class Table
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(80)]
        public string Name { get; set; }
    }
}