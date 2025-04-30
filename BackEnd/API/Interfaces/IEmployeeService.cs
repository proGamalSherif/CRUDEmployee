using API.DTO;
using API.Models;

namespace API.Interfaces
{
    public interface IEmployeeService
    {
        Task<int> GetTotalPages(int pgSize);
        Task<IEnumerable<ReadEmploeeDTO>> GetAllEmployeesAsyncWithPagination(int pgNumber,int pgSize);
        Task<IEnumerable<ReadEmploeeDTO>> FilterSearch(string searchText);
        Task<ReadEmploeeDTO> GetEmployeeByIdAsync(int id);
        Task AddEmployeeAsync(ModifyEmployeeDTO employee);
        Task UpdateEmployeeAsync(int id, ModifyEmployeeDTO employee);
        Task DeleteEmployeeAsync(int id);
    }
}
