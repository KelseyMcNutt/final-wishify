namespace Wishify.Models.DTOs;

public class CreateBoardDTO
{
     public int Id { get; set; }
        public string Name { get; set; }
        public string BoardImage { get; set; }
        public int UserProfileId { get; set; }
}