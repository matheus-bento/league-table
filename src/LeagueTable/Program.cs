using LeagueTable;
using LeagueTable.Service.RoundRobinLeagueService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Configuration.AddEnvironmentVariables("LeagueTable_");

builder.Services.Configure<ConnectionOptions>(
    builder.Configuration.GetSection("Connection"));

builder.Services.AddDbContext<LeagueTableContext>();

builder.Services.AddSingleton<IRoundRobinLeagueService>(
    (serviceProvider) => new RoundRobinLeagueService());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

app.Run();