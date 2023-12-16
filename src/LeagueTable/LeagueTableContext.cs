using LeagueTable.Model;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace LeagueTable
{
    public class LeagueTableContext : DbContext
    {
        private readonly IOptions<ConnectionOptions> _connOptions;

        public DbSet<League> Leagues { get; set; }

        public LeagueTableContext(IOptions<ConnectionOptions> connOptions)
        {
            _connOptions = connOptions;
        }

        protected override void OnConfiguring(
            DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL(_connOptions.Value.MySqlConnectionString);
        }
    }
}