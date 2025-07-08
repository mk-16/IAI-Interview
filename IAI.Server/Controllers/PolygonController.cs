using IAI.Server.Models;
using IAI.Server.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IAI.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PolygonController : ControllerBase
    {
        private readonly PolygonService _polygonService;

        public PolygonController(PolygonService polygonService)
        {
            _polygonService = polygonService;
        }

        [HttpPost]
        public async Task<IActionResult> PostPolygon([FromBody] Polygon polygon)
        {
            var polygonID = await _polygonService.CreateAsync(polygon);
            return CreatedAtAction(nameof(PostPolygon), new { id = polygonID });
        }
    }
}
