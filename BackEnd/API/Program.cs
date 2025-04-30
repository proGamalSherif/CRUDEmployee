
using API.Interfaces;
using API.Models;
using API.Repositories;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Swagger;
namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            //InjectDbContext
            builder.Services.AddDbContext<AppDbContext>(option =>
            option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            //Inject IEmployeeRepository
            builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            //Inject IUnitOfWork
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            //Inject AutoMapper
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            //Inject IEmployeeService
            builder.Services.AddScoped<IEmployeeService, EmployeeService>();


            // Add Swagger services
            builder.Services.AddSwaggerGen();


            // Add services to the container.

            builder.Services.AddControllers();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
