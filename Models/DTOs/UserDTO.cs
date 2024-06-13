using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Wishify.Models.DTOs;

public class UserDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string ProfileImage { get; set; }
    public decimal MonthlyBudget { get; set; }
   
}