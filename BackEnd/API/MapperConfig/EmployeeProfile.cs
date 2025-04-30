using API.DTO;
using API.Models;
using AutoMapper;

namespace API.MapperConfig
{
    public class EmployeeProfile:Profile
    {
        public EmployeeProfile()
        {
            CreateMap<Employee, ReadEmploeeDTO>().ReverseMap();        
            CreateMap<Employee, ModifyEmployeeDTO>().ReverseMap();
        }
    }
}
