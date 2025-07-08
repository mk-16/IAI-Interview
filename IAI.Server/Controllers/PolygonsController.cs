using IAI.Server.Models;
using IAI.Server.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IAI.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PolygonsController : ControllerBase
    {
        private readonly PolygonService _polygonService;

        public PolygonsController(PolygonService polygonService)
        {
            _polygonService = polygonService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Polygon>>> GetPolygons()
        {
            var polygons = await _polygonService.GetAllAsync();
            return Ok(polygons);
        }


        [HttpDelete]
        public async Task<ActionResult<DeleteResult>> DeletePolygons(List<string> IDs)
        {
            var results = await _polygonService.DeleteAsync(IDs);
            return Ok(results);
        }
    }
}
