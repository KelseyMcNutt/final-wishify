using System.ComponentModel.DataAnnotations;

namespace Wishify.Models;

public class Registration
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public string UserName { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    
    public string Address { get; set; }
     public string ProfileImage { get; set; }
    public decimal MonthlyBudget { get; set; }

}