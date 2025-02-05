using System.ComponentModel.DataAnnotations.Schema;

namespace BabyNamesApi.Models
{
    [Table("baby_names")]
    public class BabyName
    {
        [Column("state_code")]
        public required string StateCode { get; set; }

        [Column("gender_code")]
        public required string GenderCode { get; set; } 

        [Column("birth_year")]
        public int BirthYear { get; set; }        
        
        [Column("first_name")]
        public required string FirstName { get; set; }
        
        [Column("name_count")]
        public int NameCount { get; set; }
    }
}
