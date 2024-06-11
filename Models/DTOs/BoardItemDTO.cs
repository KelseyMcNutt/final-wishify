namespace Wishify.Models.DTOs;

public class BoardItemDTO
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public ItemDTO Item {get; set;}
        public int BoardId { get; set; }
        public BoardDTO Board {get; set;}
    }