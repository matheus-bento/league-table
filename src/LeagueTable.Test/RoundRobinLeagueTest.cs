namespace LeagueTable.Test;

using LeagueTable.Service.RoundRobinLeagueService;
using LeagueTable.Service.RoundRobinLeagueService.Model;

public class RoundRobinLeagueTest
{
    private readonly IRoundRobinLeagueService _roundRobinLeagueService;

    public RoundRobinLeagueTest()
    {
        this._roundRobinLeagueService = new RoundRobinLeagueService();
    }

    [Fact]
    public void ShouldRaiseErrorWithNullArgument()
    {
        Assert.Throws<ArgumentNullException>(
            () => this._roundRobinLeagueService
                    .GenerateRoundRobinLeagueTable(null));
    }

    [Fact]
    public void ShouldRaiseErrorWithEmptyTeamList()
    {
        IEnumerable<string> teams = new string[] { };

        Assert.Throws<ArgumentException>(
            () => this._roundRobinLeagueService
                    .GenerateRoundRobinLeagueTable(teams));
    }

    [Fact]
    public void ShouldRaiseErrorWithOddTeamCount()
    {
        IEnumerable<string> teams = new string[]
        {
            "Team A",
            "Team B",
            "Team C"
        };

        Assert.Throws<ArgumentException>(
            () => this._roundRobinLeagueService
                    .GenerateRoundRobinLeagueTable(teams));
    }

    
    [Fact]
    public void ShouldGenerateARoundRobinLeagueSuccessfully()
    {
        IEnumerable<string> teams = new string[]
        {
            "Team A",
            "Team B",
            "Team C",
            "Team D"
        };

        IEnumerable<IEnumerable<RoundRobinLeagueMatch>> roundRobinLeagueTable =
            this._roundRobinLeagueService.GenerateRoundRobinLeagueTable(teams);

        Assert.NotNull(roundRobinLeagueTable);
    }

    [Theory]
    [InlineData("Team A")]
    [InlineData("Team B")]
    [InlineData("Team C")]
    [InlineData("Team D")]
    public void ShouldGenerateHomeAndAwayMatches(string team)
    {
        IEnumerable<string> teams = new string[]
        {
            "Team A",
            "Team B",
            "Team C",
            "Team D"
        };

        IEnumerable<RoundRobinLeagueMatch>[] roundRobinLeagueTable =
            this._roundRobinLeagueService
                .GenerateRoundRobinLeagueTable(teams)
                .ToArray();

        for (int i = 0; i < roundRobinLeagueTable.Count() / 2; i++)
        {
            RoundRobinLeagueMatch currRoundMatch =
                roundRobinLeagueTable[i]
                    .First(m => m.HomeTeam == team || m.AwayTeam == team);

            RoundRobinLeagueMatch secondHalfMatch;
            int secondHalfRoundIdx = i + (teams.Count() - 1);

            if (currRoundMatch.HomeTeam == team)
            {
                secondHalfMatch =
                    roundRobinLeagueTable[secondHalfRoundIdx]
                        .First(m => m.HomeTeam == currRoundMatch.AwayTeam &&
                                    m.AwayTeam == team);
            }
            else
            {
                secondHalfMatch =
                    roundRobinLeagueTable[secondHalfRoundIdx]
                        .First(m => m.HomeTeam == team &&
                                    m.AwayTeam == currRoundMatch.HomeTeam);
            }

            Assert.True(secondHalfMatch != null);
        }
    }
}