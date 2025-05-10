using API.DTO;
using API.Interfaces;
using API.Models;
using AutoMapper;

namespace API.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        public EmployeeService(IUnitOfWork _unitOfWork, IMapper _mapper)
        {
            unitOfWork = _unitOfWork;
            mapper = _mapper;
        }
        public Task<int> GetTotalPages(int pgSize)
        {
            return unitOfWork.EmployeeRepository.GetTotalPages(pgSize);
        }
        public async Task<IEnumerable<ReadEmploeeDTO>> GetAllEmployeesAsyncWithPagination(int pgNumber, int pgSize)
        {
            var employees = await unitOfWork.EmployeeRepository.GetAllAsyncWithPagination(pgNumber, pgSize);
            var mappedEmployees = mapper.Map<IEnumerable<ReadEmploeeDTO>>(employees);
            return mappedEmployees;
        }
        public async Task<ReadEmploeeDTO> GetEmployeeByIdAsync(int id)
        {
            var employee = await unitOfWork.EmployeeRepository.GetByIdAsync(id);
            var mappedEmployee=mapper.Map<ReadEmploeeDTO>(employee);    
            return mappedEmployee;
        }
        public async Task<APIResponse.APIResponse> AddEmployeeAsync(ModifyEmployeeDTO employee)
        {
            bool canSave = await unitOfWork.EmployeeRepository.IsEmailTaken(0,employee.EmailAddress);
            if (canSave) return APIResponse.APIResponse.Fail("Email Address is Assigned To Another Employee");
            var mappedEmployee = mapper.Map<Employee>(employee);
            await unitOfWork.EmployeeRepository.AddAsync(mappedEmployee);
            return APIResponse.APIResponse.Success("Employee Created Successfull");
        }
        public async Task<APIResponse.APIResponse> UpdateEmployeeAsync(int id, ModifyEmployeeDTO employee)
        {
            bool canSave = await unitOfWork.EmployeeRepository.IsEmailTaken(id, employee.EmailAddress);
            if (canSave) return APIResponse.APIResponse.Fail("Email Address is Assigned To Another Employee");
            var mappedEmployee = mapper.Map<Employee>(employee);
            await unitOfWork.EmployeeRepository.Update(id, mappedEmployee);
            return APIResponse.APIResponse.Success("Employee Updated Successfull");
        }
        public async Task DeleteEmployeeAsync(int id)
        {
            await unitOfWork.EmployeeRepository.Delete(id);
        }
        public async Task<IEnumerable<ReadEmploeeDTO>> FilterSearch(string searchText)
        {
            var employess = await unitOfWork.EmployeeRepository.FilterSearch(searchText);
            var mappedEmployee = mapper.Map<IEnumerable<ReadEmploeeDTO>>(employess);
            return mappedEmployee;
        }
    }
}
