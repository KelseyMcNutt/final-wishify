namespace Wishify.Models;

public class BoardItem
{
    public int Id {get; set;}
    public int BoardId {get; set;}
    public Board Board {get; set;}
    public int ItemId {get; set;}
    public Item Item {get; set;}
}