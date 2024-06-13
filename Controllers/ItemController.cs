using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Wishify.Data;
using Wishify.Models;
using Wishify.Models.DTOs;

namespace Wishify.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemDetailsController : ControllerBase
    {
        private readonly WishifyDbContext _context;

        public ItemDetailsController(WishifyDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDetailsDTO>> GetItemDetails(int id)
        {
            var itemDetails = await _context.Items
                .Include(i => i.Store) 
                .Select(i => new ItemDetailsDTO
                {
                    Id = i.Id,
                    Name = i.Name,
                    Link = i.Link,
                    Image = i.Image,
                    Price = i.Price,
                    StoreId = i.Store.Id,
                    Store = new StoreDTO
                    {
                        Id = i.Store.Id,
                        Name = i.Store.Name
                    },
                    UserProfileId = i.UserProfileId,
                    DateAdded = DateTime.Now, 
                    InCart = i.InCart
                })
                .FirstOrDefaultAsync(i => i.Id == id);

            if (itemDetails == null)
            {
                return NotFound();
            }

            return itemDetails;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, ItemDetailsDTO itemDetailsDto)
        {
            if (id != itemDetailsDto.Id)
            {
                return BadRequest();
            }

            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            item.Name = itemDetailsDto.Name;
            item.Link = itemDetailsDto.Link;
            item.Image = itemDetailsDto.Image;
            item.Price = itemDetailsDto.Price;
            item.StoreId = itemDetailsDto.StoreId;
            item.InCart = itemDetailsDto.InCart;

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.Id == id);
        }


         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

           [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<ItemDTO>>> GetItemsByUserId(int userId)
        {
            var items = await _context.Items
                .Where(i => i.UserProfileId == userId)
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
                .ToListAsync();

            return items;
        }


        [HttpPost ("{userId}")]
        public async Task<ActionResult<ItemDTO>> CreateItem(AddItemDTO itemDto, int userId)
        {
            var item = new Item
            {
                Name = itemDto.Name,
                Link = itemDto.Link,
                Image = itemDto.Image,
                Price = itemDto.Price,
                StoreId = itemDto.StoreId,
                UserProfileId = userId,
                DateAdded = DateTime.Now,
                InCart = itemDto.InCart
            };

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItemDetails), new { id = item.Id }, itemDto);
        }

    }
}
