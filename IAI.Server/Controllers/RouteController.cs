using IAI.Server.Models;
using IAI.Server.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IAI.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RouteController : ControllerBase
    {
        private readonly RouteService _routeService;

        public RouteController(RouteService routeService)
        {
            _routeService = routeService;
        }

        [HttpGet]
        public async Task<ActionResult<Models.Route>> Get()
        {
            var path = await _routeService.getASync();
            return Ok(path[0]);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Models.Route route)
        {
            var id = await _routeService.CreateAsync(route);
            return CreatedAtAction(nameof(Post), new { id });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] List<string> IDs)
        {
            var results = await _routeService.DeleteAsync(IDs[0]);
            return Ok(results);
        }
    }
}
