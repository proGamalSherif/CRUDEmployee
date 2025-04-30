using System.Drawing;
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
        public async Task<int> GetTotalPages(int pgSize)
        {
            int TotalCount = await db.Employees.CountAsync();
            return (int)Math.Ceiling((double)TotalCount / pgSize);
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

        public async Task<IEnumerable<Employee>> GetAllAsyncWithPagination(int pgNumber, int pgSize)
        {
            return await db.Employees
                .Skip((pgNumber - 1) * pgSize)
                .Take(pgSize)
                .ToListAsync();
        }

        public async Task<IEnumerable<Employee>> FilterSearch(string searchText)
        {
            if(searchText != "")
            {
                return await db.Employees
               .Where(e =>
               e.FirstName.ToLower().Contains(searchText.ToLower()) ||
               e.LastName.ToLower().Contains(searchText.ToLower()) ||
               (e.FirstName.ToLower() + " " + e.LastName.ToLower()).Contains(searchText.ToLower()) ||
               e.Position.ToLower().Contains(searchText.ToLower()) ||
               e.EmailAddress.ToLower().Contains(searchText.ToLower()))
               .ToListAsync();
            }
            else
            {
                return await db.Employees.ToListAsync();
            }
        }
    }
}
