
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Wishify.Models;

public class UserProfile
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    public string Address { get; set; }
    [NotMapped]
    public string UserName {get; set;}
    
    [NotMapped]
    public string Email {get; set;}
    
    [NotMapped]
    public List<string> Roles { get; set; }
    public string IdentityUserId { get; set; }
    public IdentityUser IdentityUser { get; set; }
    public string ProfileImage { get; set; }
    [Required]
    public decimal MonthlyBudget { get; set; }
   
}