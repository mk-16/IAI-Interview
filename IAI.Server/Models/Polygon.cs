using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace IAI.Server.Models
{
    public class Polygon
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public  string ?Id { get; set; }

        [BsonElement("coordinates")]
        public required List<List<double>> Coordinates { get; set; }

        [BsonElement("height")]
        public required double Height { get; set; }
    }
}
