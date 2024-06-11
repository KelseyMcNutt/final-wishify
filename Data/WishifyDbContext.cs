using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Wishify.Models;
using Microsoft.AspNetCore.Identity;

namespace Wishify.Data;
public class WishifyDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
  
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Board> Boards { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<Store> Stores { get; set; }
    public DbSet<BoardItem> BoardItems { get; set; }
    

    public WishifyDbContext(DbContextOptions<WishifyDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BoardItem>()
                .HasKey(bi => new { bi.BoardId, bi.ItemId });
        
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
            ProfileImage = "https://nationalkennelclub.com/wp-content/uploads/2022/09/iStock-926722890-res.jpg",
            MonthlyBudget = 200
        });


        modelBuilder.Entity<Store>().HasData(
            new Store { Id = 1, Name = "Store 1" },
            new Store { Id = 2, Name = "Store 2" },
            new Store { Id = 3, Name = "Store 3" },
            new Store { Id = 4, Name = "Store 4" }
        );

        modelBuilder.Entity<Board>().HasData(
            new Board { Id = 1, Name = "Board 1", BoardImage = "board1.jpg", UserProfileId = 1 },
            new Board { Id = 2, Name = "Board 2", BoardImage = "board2.jpg", UserProfileId = 1 },
            new Board { Id = 3, Name = "Board 3", BoardImage = "board3.jpg", UserProfileId = 1 }
        );

        modelBuilder.Entity<Item>().HasData(
            new Item { Id = 1, Name = "Item 1", Link = "link1", Image = "image1.jpg", Price = 10, DateAdded = DateTime.Now, StoreId = 1, UserProfileId = 1, InCart = false },
            new Item { Id = 2, Name = "Item 2", Link = "link2", Image = "image2.jpg", Price = 20, DateAdded = DateTime.Now, StoreId = 2, UserProfileId = 1, InCart = false },
            new Item { Id = 3, Name = "Item 3", Link = "link3", Image = "image3.jpg", Price = 30, DateAdded = DateTime.Now, StoreId = 3, UserProfileId = 1, InCart = false },
            new Item { Id = 4, Name = "Item 4", Link = "link4", Image = "image4.jpg", Price = 40, DateAdded = DateTime.Now, StoreId = 4, UserProfileId = 1, InCart = false },
            new Item { Id = 5, Name = "Item 5", Link = "link5", Image = "image5.jpg", Price = 50, DateAdded = DateTime.Now, StoreId = 1, UserProfileId = 1, InCart = false },
            new Item { Id = 6, Name = "Item 6", Link = "link6", Image = "image6.jpg", Price = 60, DateAdded = DateTime.Now, StoreId = 1, UserProfileId = 1, InCart = false },
            new Item { Id = 7, Name = "Item 7", Link = "link7", Image = "image7.jpg", Price = 70, DateAdded = DateTime.Now, StoreId = 3, UserProfileId = 1, InCart = false },
            new Item { Id = 8, Name = "Item 8", Link = "link8", Image = "image8.jpg", Price = 80, DateAdded = DateTime.Now, StoreId = 4, UserProfileId = 1, InCart = false },
            new Item { Id = 9, Name = "Item 9", Link = "link9", Image = "image9.jpg", Price = 90, DateAdded = DateTime.Now, StoreId = 1, UserProfileId = 1, InCart = false },
            new Item { Id = 10, Name = "Item 10", Link = "link10", Image = "image10.jpg", Price = 100, DateAdded = DateTime.Now, StoreId = 2, UserProfileId = 1, InCart = false }
        );

            // BoardItem associations
        modelBuilder.Entity<BoardItem>().HasData(
            new BoardItem { BoardId = 1, ItemId = 1 },
            new BoardItem { BoardId = 1, ItemId = 2 },
            new BoardItem { BoardId = 1, ItemId = 3 },
            new BoardItem { BoardId = 2, ItemId = 4 },
            new BoardItem { BoardId = 2, ItemId = 5 },
            new BoardItem { BoardId = 2, ItemId = 6 },
            new BoardItem { BoardId = 3, ItemId = 7 },
            new BoardItem { BoardId = 3, ItemId = 8 },
            new BoardItem { BoardId = 3, ItemId = 9 },
            new BoardItem { BoardId = 3, ItemId = 10 }
        );
        }
      
    };
