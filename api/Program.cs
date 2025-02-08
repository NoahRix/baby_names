using BabyNamesApi.Data;
using BabyNamesApi.Models;
using BabyNamesApi.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Register DbContext for MySQL with connection string
builder.Services.AddDbContext<BabyNamesDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));

// Register the BabyNameService
builder.Services.AddScoped<BabyNamesService>();

// Add Swagger support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Configure the Swagger UI if needed
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Baby Names API",
        Version = "v1",
        Description = "API to manage baby names data"
    });
});

var app = builder.Build();

app.UsePathBase("/api");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/api/swagger/v1/swagger.json", "Baby Names API v1");
        c.RoutePrefix = "swagger"; // Serve Swagger UI at the root
    });
}

app.MapControllers();

app.Run();
