using API.DTO;

namespace API.Interfaces
{
    public interface IEmployeeService
    {
        Task<int> GetTotalPages(int pgSize);
        Task<IEnumerable<ReadEmploeeDTO>> GetAllEmployeesAsyncWithPagination(int pgNumber,int pgSize);
        Task<IEnumerable<ReadEmploeeDTO>> FilterSearch(string searchText);
        Task<ReadEmploeeDTO> GetEmployeeByIdAsync(int id);
        Task<API.APIResponse.APIResponse> AddEmployeeAsync(ModifyEmployeeDTO employee);
        Task<API.APIResponse.APIResponse> UpdateEmployeeAsync(int id, ModifyEmployeeDTO employee);
        Task DeleteEmployeeAsync(int id);
    }
}
