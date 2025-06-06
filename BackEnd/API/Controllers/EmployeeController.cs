﻿using API.APIResponse;
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
        [HttpGet("GetTotalPages/{pgSize}")]
        public async Task<ActionResult> GetTotalPages(int pgSize)
        {
            var totalPages = await employeeService.GetTotalPages(pgSize);
            return Ok(totalPages);
        }
        [HttpGet("FilterEmployee/{searchText}")]
        public async Task<ActionResult> FilterEmployee(string searchText)
        {
            var employees = await employeeService.FilterSearch(searchText);
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
        public async Task<ActionResult> Insert([FromForm] ModifyEmployeeDTO employeeModel)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            if(employeeModel == null)
                return BadRequest(ModelState);
            APIResponse.APIResponse result = await employeeService.AddEmployeeAsync(employeeModel);
            if (result.IsSuccess)
            {
                return Ok(new { Message = result.SuccessMessage });
            }
            else
            {
                return BadRequest(new { Message = result.ErrorMessage });
            }
        }
        [HttpPut("{id}")]
        public async Task <ActionResult> Update(int id, [FromForm] ModifyEmployeeDTO employeeModel)
        {
            if(id <= 0)
                return BadRequest(ModelState);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (employeeModel == null)
                return BadRequest(ModelState);
            APIResponse.APIResponse result = await employeeService.UpdateEmployeeAsync(id,employeeModel);
            if (result.IsSuccess)
            {
                return Ok(new { Message = result.SuccessMessage });
            }
            else
            {
                return BadRequest(new { Message = result.ErrorMessage });
            }
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
