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
    }
}
