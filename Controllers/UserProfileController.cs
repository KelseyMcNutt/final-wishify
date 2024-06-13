using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wishify.Data;
using Wishify.Models;
using Wishify.Models.DTOs;

namespace Wishify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly WishifyDbContext _context;

        public UserController(WishifyDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<UserProfileDTO>> GetUserProfile(int userId)
        {
            var userProfile = await _context.UserProfiles
                .Select(up => new UserProfileDTO
                {
                    Id = up.Id,
                    FirstName = up.FirstName,
                    LastName = up.LastName,
                    MonthlyBudget = up.MonthlyBudget,
                    ProfileImage = up.ProfileImage
                })
                .FirstOrDefaultAsync(up => up.Id == userId);

            if (userProfile == null)
            {
                return NotFound();
            }

            return userProfile;
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUserProfile(int userId, UserDTO userProfileDto)
        {
           

            var userProfile = await _context.UserProfiles.FindAsync(userId);
            if (userProfile == null)
            {
                return NotFound();
            }

            userProfile.FirstName = userProfileDto.FirstName;
            userProfile.LastName = userProfileDto.LastName;
            userProfile.MonthlyBudget = userProfileDto.MonthlyBudget;
            userProfile.ProfileImage = userProfileDto.ProfileImage;

            _context.Entry(userProfile).State = EntityState.Modified;
            await _context.SaveChangesAsync();
           

            return NoContent();
        }

     

        [HttpGet("{userId}/cart")]
        public IActionResult GetUserCartItems(int userId)
        {
            var cartItems =  _context.Items
            .Where(i => i.UserProfileId == userId && i.InCart)
            .Select(i => new ItemDTO
            {
                Id = i.Id,
                Name = i.Name,
                Link = i.Link,
                Image = i.Image,
                Price = i.Price,
                StoreId = i.StoreId,
                Store = i.Store,
                UserProfileId = i.UserProfileId,
                UserProfile = new UserProfileDTO
                {
                    Id = i.UserProfile.Id,
                    FirstName = i.UserProfile.FirstName,
                    LastName = i.UserProfile.LastName,
                    ProfileImage = i.UserProfile.ProfileImage,
                    MonthlyBudget = i.UserProfile.MonthlyBudget
                },
                DateAdded = i.DateAdded,
                InCart = i.InCart
            })
            .ToList();

            if (cartItems == null || !cartItems.Any())
            {
                return NotFound();
            }

            return Ok(cartItems);
        }

       
    }
}
