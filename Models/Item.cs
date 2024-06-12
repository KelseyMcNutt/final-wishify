namespace Wishify.Models;
public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Link { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
        public DateTime DateAdded { get; set; }
        public int StoreId { get; set; }
        public Store Store {get; set;}
        public int UserProfileId { get; set; }
        public UserProfile UserProfile {get; set;}
        public bool InCart { get; set; }
       
    }