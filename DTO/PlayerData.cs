using System.Text.Json.Serialization;

namespace Catalog.DTO
{
    public class PlayerData
    {
        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        [JsonPropertyName("sex")]
        public bool IsMale { get; set; }

        [JsonPropertyName("birthDate")]
        public DateOnly BirthDate { get; set; }

        [JsonPropertyName("team")]
        public string Team { get; set; }

        [JsonPropertyName("country")]
        public string Country { get; set; }
    }
}
