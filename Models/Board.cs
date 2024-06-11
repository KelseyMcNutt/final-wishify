namespace Wishify.Models;
    public class Board
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string BoardImage { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile {get; set;}
    }