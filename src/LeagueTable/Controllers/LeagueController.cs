using Microsoft.AspNetCore.Mvc;

namespace LeagueTable.Controllers
{
    [ApiController]
    [Route("/league-table")]
    public class LeagueTableController : ControllerBase
    {
        [HttpGet]
        public string Index()
        {
            return "Hello :)";
        }
    }
}