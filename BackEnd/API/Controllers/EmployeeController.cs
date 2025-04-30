using API.DTO;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService employeeService;
        public EmployeeController(IEmployeeService _employeeService)
        {
            employeeService= _employeeService;
        }
        [HttpGet]
        public async Task<ActionResult> GetAllAsync()
        {
            var employees = await employeeService.GetAllEmployeesAsync();
            return Ok(employees);
        }
        [HttpGet("{pgNumber}/{pgSize}")]
        public async Task<ActionResult> GetAllAsyncWithPagination(int pgNumber,int pgSize)
        {
            var employees = await employeeService.GetAllEmployeesAsyncWithPagination(pgNumber,pgSize);
            return Ok(employees);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> GetByIdAsync(int id)
        {
            var employee = await employeeService.GetEmployeeByIdAsync(id);
            return Ok(employee);
        }
        [HttpPost]
        public async Task<ActionResult> Insert(ModifyEmployeeDTO employeeModel)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            if(employeeModel == null)
                return BadRequest(ModelState);
            await employeeService.AddEmployeeAsync(employeeModel);
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task <ActionResult> Update(int id,ModifyEmployeeDTO employeeModel)
        {
            if(id <= 0)
                return BadRequest(ModelState);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (employeeModel == null)
                return BadRequest(ModelState);
            await employeeService.UpdateEmployeeAsync(id, employeeModel);
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            if (id <= 0)
                return BadRequest(ModelState);
           await employeeService.DeleteEmployeeAsync(id);
            return Ok();
        }
    }
}
