using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Wishify.Data;
using Wishify.Models;

namespace Wishify.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BoardItemController : ControllerBase
    {
        private readonly WishifyDbContext _context;

        public BoardItemController(WishifyDbContext context)
        {
            _context = context;
        }

        [HttpGet("{boardId}")]
        public ActionResult<IEnumerable<Item>> GetItemsForBoard(int boardId)
        {
            var items = _context.BoardItems
                .Where(bi => bi.BoardId == boardId)
                .Select(bi => bi.Item)
                .ToList();

            if (items == null || !items.Any())
            {
                return NotFound("No items found for the board.");
            }

            return items;
        }
    }
}
