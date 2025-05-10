namespace API.APIResponse
{
    public class APIResponse
    {
        public bool IsSuccess { get; set; }
        public string SuccessMessage { get; set; }
        public string ErrorMessage { get; set; }
        public static APIResponse Success(string message = "Success")
        {
            return new APIResponse
            {
                IsSuccess = true,
                SuccessMessage = message
            }; 
        }
        public static APIResponse Fail(string message = "Failed")
        {
            return new APIResponse
            {
                IsSuccess = false,
                ErrorMessage = message
            };
        }
    }
}
