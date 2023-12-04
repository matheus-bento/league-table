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
                // 1st half
                //
                // For the 1st half of the table each team gets their table
                // generated round by round with a random opponent picked for
                // each round
                for (int i = 0; i < roundCount / 2; i++)
                {
                    if (table.ElementAtOrDefault(i) == null)
                    {
                        table.Add(new List<RoundRobinLeagueMatch>());
                    }
                    // If the current team already has a match in this round
                    // we skip to the next one
                    else if (table[i].Any(r => r.HomeTeam == team ||
                                               r.AwayTeam == team))
                    {
                        continue;
                    }

                    var remainingTeams = new List<string>(teams);
                    remainingTeams.Remove(team);

                    string opponent = null;

                    // If a match against the chosen opponent already has a
                    // match in the current round we remove the opponent from
                    // the pool of remaining teams until we find a team that
                    // does not have a match on this round yet
                    do
                    {
                        if (remainingTeams.Count() == 0)
                        {
                            opponent = null;
                            continue;
                        }

                        opponent = this.GetRandomTeam(remainingTeams);
                        remainingTeams.Remove(opponent);
                    }
                    while (
                        table[i].Any(r => r.HomeTeam == opponent ||
                                          r.AwayTeam == opponent)
                    );

                    if (opponent != null)
                    {
                        RoundRobinLeagueMatch match;
                        bool homeMatch = this.GetRandomNumber() % 2 == 0;

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
                    }
                }

                // 2nd half
                //
                // For the 2nd half of the table the home and away teams are
                // simply flipped compared to the 1st half matches
                for (int i = roundCount / 2; i < roundCount; i++)
                {
                    int firstHalfRoundIdx = i - (roundCount / 2);

                    if (table.ElementAtOrDefault(i) == null)
                    {
                        table.Add(new List<RoundRobinLeagueMatch>());
                    }
                    // If the current team already has a match in this round
                    // we skip to the next one
                    else if (table[i].Any(r => r.HomeTeam == team ||
                                               r.AwayTeam == team))
                    {
                        continue;
                    }
                    // If the current team doesn't have a match generated for
                    // the corresponding 1st half round we skip to the next one
                    else if (
                        !table[firstHalfRoundIdx]
                            .Any(r => r.HomeTeam == team ||
                                      r.AwayTeam == team))
                    {
                        continue;
                    }

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