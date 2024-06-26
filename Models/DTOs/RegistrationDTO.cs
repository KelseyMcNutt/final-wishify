namespace Wishify.Models.DTOs
{
    public class RegistrationDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string ProfileImage { get; set; }
        public decimal MonthlyBudget { get; set; }
    }
}
