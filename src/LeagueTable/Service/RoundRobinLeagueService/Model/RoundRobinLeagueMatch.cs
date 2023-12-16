namespace LeagueTable.Service.RoundRobinLeagueService.Model
{
    /// <summary>
    ///     Represents a match in a round-robin league table
    /// </summary>
    public class RoundRobinLeagueMatch
    {
        public string HomeTeam { get; set; } = string.Empty;
        public string AwayTeam { get; set; } = string.Empty;
    }
}