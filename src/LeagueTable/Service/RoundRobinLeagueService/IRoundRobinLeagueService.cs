using LeagueTable.Service.RoundRobinLeagueService.Model;

namespace LeagueTable.Service.RoundRobinLeagueService
{
    public interface IRoundRobinLeagueService
    {
        /// <summary>
        ///     Create a table for a round robin league format where each
        ///     team faces every other team
        /// </summary>
        /// <param name="teams">
        ///     List of the names of the participant teams
        ///</param>
        IEnumerable<IEnumerable<RoundRobinLeagueMatch>> GenerateRoundRobinLeagueTable(
            IEnumerable<string> teams);
    }
}