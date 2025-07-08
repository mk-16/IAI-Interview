using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace IAI.Server.Models
{
    public class Route
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ?Id { get; set; }

        [BsonElement("coordinates")] 
        public required List<List<double>> Coordinates { get; set; }
    }
}
