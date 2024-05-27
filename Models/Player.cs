namespace Catalog.Models
{
    public class Player
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsMale { get; set; }
        public DateOnly BirthDate { get; set; }
        public Team Team { get; set; }
        public Country Country { get; set; }
    }
}
