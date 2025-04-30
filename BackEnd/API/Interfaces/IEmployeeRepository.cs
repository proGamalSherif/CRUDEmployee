using API.Models;

namespace API.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<int> GetTotalPages(int pgSize);
        Task<IEnumerable<Employee>> GetAllAsyncWithPagination(int pgNumber, int pgSize);
        Task<Employee> GetByIdAsync(int id);
        Task AddAsync(Employee employee);
        Task Update(int id, Employee employee);
        Task Delete(int id);
    }
}
