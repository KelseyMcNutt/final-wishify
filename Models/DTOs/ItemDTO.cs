namespace Wishify.Models.DTOs;

  public class ItemDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Link { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
        public int UserProfileId {get; set;}
        public UserProfileDTO UserProfile {get; set;}
        public DateTime DateAdded { get; set; }
        public bool InCart { get; set; }
    }