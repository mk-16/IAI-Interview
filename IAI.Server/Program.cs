using IAI.Server.Services;
using IAI.Server.Settings;
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoSettings>(builder.Configuration.GetSection("MongoSettings"));
builder.Services.AddSingleton<PolygonService>();
builder.Services.AddSingleton<RouteService>();
builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
