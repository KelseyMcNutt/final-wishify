using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Wishify.Data;
using Wishify.Models;
using Wishify.Models.DTOs;

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

            return items;
        }

        [HttpGet("{itemId}/get")]
        public async Task<ActionResult<IEnumerable<BoardItemDTO>>> GetBoardItems(int itemId)
        {
            var boardItems = await _context.BoardItems
                .Where(bi => bi.ItemId == itemId)
                .Include(bi => bi.Board)
                .Select(bi => new BoardItemDTO
                {
                    Id = bi.Id,
                    ItemId = bi.ItemId,
                    BoardId = bi.BoardId,
                    Board = new BoardDTO
                    {
                        Id = bi.Board.Id,
                        Name = bi.Board.Name
                    }
                })
                .ToListAsync();

            return boardItems;
        }


        [HttpPut("{itemId}")]
        public async Task<IActionResult> UpdateBoardItems(int itemId, List<int> boardIds)
        {
            var existingBoardItems = await _context.BoardItems
                .Where(bi => bi.ItemId == itemId)
                .ToListAsync();

            _context.BoardItems.RemoveRange(existingBoardItems);

            var newBoardItems = boardIds.Select(boardId => new BoardItem
            {
                ItemId = itemId,
                BoardId = boardId
            });

            _context.BoardItems.AddRange(newBoardItems);

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
