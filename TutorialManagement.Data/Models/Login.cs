using System.ComponentModel.DataAnnotations;


namespace TutorialManagement.Data.Models
{
    public  class Login
    {
        [Required(ErrorMessage = "Please enter a valid  User Name")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Please enter a valid  Password")]
        public string Password { get; set; }
    }
}
