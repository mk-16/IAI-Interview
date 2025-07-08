using IAI.Server.Models;
using IAI.Server.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq;

namespace IAI.Server.Services
{
    public class PolygonService
    {
        private readonly IMongoCollection<Polygon> _polygons;

        public PolygonService(IOptions<MongoSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _polygons = database.GetCollection<Polygon>("Polygons");
        }

        public async Task<List<Polygon>> GetAllAsync()
        {
           return await _polygons.Find(p => true).ToListAsync();
        }

        public async Task<string?> CreateAsync(Polygon polygon)
        {
            await _polygons.InsertOneAsync(polygon);
            return polygon.Id;
        }
        public async Task<DeleteResult> DeleteAsync(List<string> IDs)
        {
            var filter = Builders<Polygon>.Filter.In(document => document.Id, IDs); 
            return await _polygons.DeleteManyAsync(filter);
        }
    }

}
