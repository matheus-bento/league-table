using LeagueTable.Service.RoundRobinLeagueService.Model;
using System.Security.Cryptography;

namespace LeagueTable.Service.RoundRobinLeagueService
{
    public class RoundRobinLeagueService : IRoundRobinLeagueService
    {
        private string GetRandomTeam(IEnumerable<string> teams)
        {
            int teamCount = teams.Count();
            return teams.ElementAt(RandomNumberGenerator.GetInt32(teamCount));
        }

        private int GetRandomNumber()
        {
            return RandomNumberGenerator.GetInt32(int.MaxValue);
        }

        public IEnumerable<IEnumerable<RoundRobinLeagueMatch>> GenerateRoundRobinLeagueTable(
            IEnumerable<string> teams)
        {
            if (teams == null)
            {
                throw new ArgumentNullException(nameof(teams));
            }

            int teamCount = teams.Count();

            if (teamCount == 0)
            {
                throw new ArgumentException("No teams informed", nameof(teams));
            }

            if ((teamCount % 2) != 0)
            {
                throw new ArgumentException(
                    "The number of teams should be even so that all teams " +
                    "get to play in every round.", nameof(teams));
            }

            int roundCount = (teamCount - 1) * 2;

            IList<IList<RoundRobinLeagueMatch>> table =
                new List<IList<RoundRobinLeagueMatch>>();

            foreach (string team in teams)
            {
                IList<string> remainingTeams = new List<string>(teams);

                remainingTeams.Remove(team);

                // 1st half
                for (int i = 0; i < roundCount / 2; i++)
                {
                    if (table.ElementAtOrDefault(i) == null)
                    {
                        table.Add(new List<RoundRobinLeagueMatch>());
                    }

                    RoundRobinLeagueMatch match;

                    bool homeMatch = this.GetRandomNumber() % 2 == 0;
                    string opponent = this.GetRandomTeam(remainingTeams);

                    if (homeMatch)
                    {
                        match = new RoundRobinLeagueMatch
                        {
                            HomeTeam = team,
                            AwayTeam = opponent
                        };
                    }
                    else
                    {
                        match = new RoundRobinLeagueMatch
                        {
                            HomeTeam = opponent,
                            AwayTeam = team
                        };
                    }

                    table[i].Add(match);
                    remainingTeams.Remove(opponent);
                }

                // 2nd half
                for (int i = roundCount / 2; i < roundCount; i++)
                {
                    if (table.ElementAtOrDefault(i) == null)
                    {
                        table.Add(new List<RoundRobinLeagueMatch>());
                    }

                    int firstHalfRoundIdx = i - (roundCount / 2);

                    RoundRobinLeagueMatch firstHalfMatch =
                        table[firstHalfRoundIdx]
                            .First(m => m.HomeTeam == team ||
                                        m.AwayTeam == team);

                    RoundRobinLeagueMatch secondHalfMatch;

                    if (firstHalfMatch.HomeTeam == team)
                    {
                        secondHalfMatch = new RoundRobinLeagueMatch
                        {
                            HomeTeam = firstHalfMatch.AwayTeam,
                            AwayTeam = team
                        };
                    }
                    else
                    {
                        secondHalfMatch = new RoundRobinLeagueMatch
                        {
                            HomeTeam = team,
                            AwayTeam = firstHalfMatch.HomeTeam
                        };
                    }

                    table[i].Add(secondHalfMatch);
                }
            }

            return table;
        }
    }
}