using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Wishify.Data;
using Wishify.Models.DTOs;
using Wishify.Models;

namespace Wishify.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StoresController : ControllerBase
    {
        private readonly WishifyDbContext _DbContext;

        public StoresController(WishifyDbContext context)
        {
            _DbContext = context;
        }

        [HttpGet("user-stores/{userId}")]
        public IActionResult GetUserStores(int userId)
        {
            var stores = _DbContext.Items
                .Where(item => item.UserProfileId == userId)
                .Select(item => item.Store)
                .Distinct()
                .Select(store => new StoreDTO
                {
                    Id = store.Id,
                    Name = store.Name
                })
                .ToList();

            return Ok(stores);
        }

        [HttpPost("add-store")]
        public IActionResult AddStore([FromBody] StoreDTO newStore)
        {
            var store = new Store
            {
                Name = newStore.Name,
                
            };

            _DbContext.Stores.Add(store);
            _DbContext.SaveChanges();

            return Ok(new StoreDTO
            {
                Id = store.Id,
                Name = store.Name
            });
        }


    }
}
