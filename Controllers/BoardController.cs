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

      [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBoard(int id)
        {
            var board = await _context.Boards.FindAsync(id);
            if (board == null)
            {
                return NotFound();
            }

            _context.Boards.Remove(board);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BoardExists(int id)
        {
            return _context.Boards.Any(e => e.Id == id);
        }



[HttpPut("{id}/edit")]
public async Task<IActionResult> EditBoard(int id, CreateBoardDTO board)
{
    if (id != board.Id)
    {
        return BadRequest();
    }

    var existingBoard = await _context.Boards.FindAsync(id);
    if (existingBoard == null)
    {
        return NotFound();
    }

    existingBoard.Id = board.Id;
    existingBoard.Name = board.Name;
    existingBoard.BoardImage = board.BoardImage;
    existingBoard.UserProfileId = board.UserProfileId;

    _context.Entry(existingBoard).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!BoardExists(id))
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

     [HttpGet("{boardId}/one")]
        public async Task<ActionResult<Board>> GetBoard(int boardId)
        {
            var board = await _context.Boards.FindAsync(boardId);

            if (board == null)
            {
                return NotFound();
            }

            return board;
        }



    }
}
