using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class ModifyEmployeeDTO
    {
        [Required(ErrorMessage = "First Name is required")]
        [MaxLength(100, ErrorMessage = "First Name length shouldn't be more than 100 characters")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Last Name is required")]
        [MaxLength(100, ErrorMessage = "Last Name length shouldn't be more than 100 characters")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Email Address is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        [MaxLength(100, ErrorMessage = "Email Address length shouldn't be more than 100 characters")]
        public string EmailAddress { get; set; }
        [Required(ErrorMessage = "Position is required")]
        [MaxLength(100, ErrorMessage = "Position length shouldn't be more than 100 characters")]
        public string Position { get; set; }
    }
}
