using API.Models;

namespace API.Interfaces
{
    public interface IEmployeeRepository
    {
        public Task<IEnumerable<Employee>> GetAllAsync();
        public Task<IEnumerable<Employee>> GetAllAsyncWithPagination(int pgNumber, int pgSize);
        public Task<Employee> GetByIdAsync(int id);
        public Task AddAsync(Employee employee);
        public Task Update(int id, Employee employee);
        public Task Delete(int id);
    }
}
