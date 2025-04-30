using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext db;
        public EmployeeRepository(AppDbContext _db)
        {
            db = _db;
        }
        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await db.Employees.ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await db.Employees.FindAsync(id);
        }

        public async Task AddAsync(Employee employee)
        {
            await db.Employees.AddAsync(employee);
            await db.SaveChangesAsync();
        }
        public async Task Update(int id, Employee employee)
        {
            var oldEmployee = await GetByIdAsync(id);
            if (oldEmployee != null)
            {
                oldEmployee.FirstName=employee.FirstName;
                oldEmployee.LastName=employee.LastName;
                oldEmployee.EmailAddress=employee.EmailAddress; 
                oldEmployee.Position=employee.Position;
                await db.SaveChangesAsync();
            }
        }
        public async Task Delete(int id)
        {
            var employee=await GetByIdAsync(id);
            if(employee != null)
            {
               db.Employees.Remove(employee);
                await db.SaveChangesAsync();
            }
        }
    }
}
