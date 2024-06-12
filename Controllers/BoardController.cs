using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Wishify.Models;
using Wishify.Models.DTOs;
using Wishify.Data;

namespace Wishify.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BoardController : ControllerBase
    {
        private readonly WishifyDbContext _context;

        public BoardController(WishifyDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public ActionResult<IEnumerable<Board>> GetBoardsByUserId(int userId)
        {
            var boards = _context.Boards
                .Include(b => b.UserProfile)
                .Where(b => b.UserProfileId == userId)
                .ToList();

            if (boards == null)
            {
                return NotFound();
            }

            return boards;
        }
    
[HttpPost("create")]
public async Task<IActionResult> CreateBoard([FromBody] CreateBoardDTO boardDto)
{
    try
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userProfile = await _context.UserProfiles.FindAsync(boardDto.UserProfileId);
        if (userProfile == null)
        {
            return BadRequest("UserProfile not found");
        }

        var board = new Board
        {
            Name = boardDto.Name,
            BoardImage = boardDto.BoardImage,
            UserProfileId = boardDto.UserProfileId
            
        };
   
        _context.Boards.Add(board);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBoardsByUserId), new { userId = boardDto.UserProfileId }, board);

    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

     
       
    }
}
