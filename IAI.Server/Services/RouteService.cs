using IAI.Server.Models;
using IAI.Server.Settings;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace IAI.Server.Services
{
    public class RouteService
    {
        private readonly IMongoCollection<Models.Route> _route;

        public RouteService(IOptions<MongoSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _route = database.GetCollection<Models.Route>("Route");
        }

        public async Task<List<Models.Route>> getASync()
        {
           return await _route.Find(p => true).ToListAsync();
        }

        public async Task<string> CreateAsync(Models.Route route)
        {
            await _route.InsertOneAsync(route);
            return route.Id!;
        }

        public async Task<DeleteResult> DeleteAsync(string ID)
        {
            var filter = Builders<Models.Route>.Filter.Eq(document => document.Id, ID);
            return await _route.DeleteOneAsync(filter); 
        }
    }

}
