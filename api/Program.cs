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
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Baby Names API",
        Version = "v1",
        Description = "API to manage baby names data"
    });
});

var app = builder.Build();

// Remove UsePathBase("/api") to avoid duplication
// app.UsePathBase("/api");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        // Serve the Swagger JSON from the correct path. Previously this referenced
        // "/api/swagger/v1/swagger.json" which assumes a PathBase of "/api".
        // Use the standard path so the UI can fetch the definition correctly.
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Baby Names API v1");
    });
}

app.MapControllers();

app.Run();
