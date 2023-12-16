using LeagueTable.Service.RoundRobinLeagueService;

using Microsoft.AspNetCore.Mvc;

namespace LeagueTable.Controllers
{
    [ApiController]
    public class RoundRobinLeagueController : ControllerBase
    {
        private readonly IRoundRobinLeagueService _roundRobinLeagueService;

        public RoundRobinLeagueController(
            IRoundRobinLeagueService roundRobinLeagueService)
        {
            this._roundRobinLeagueService = roundRobinLeagueService;
        }

        [HttpPost]
        [Route("/api/league-table/round-robin/create")]
        public ActionResult<IEnumerable<IEnumerable<string>>> Create(IEnumerable<string> teams)
        {
            try
            {
                if (teams == null || teams.Count() == 0)
                    return StatusCode(StatusCodes.Status400BadRequest);

                var table =
                    this._roundRobinLeagueService
                        .GenerateRoundRobinLeagueTable(teams);

                return StatusCode(200, table);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}