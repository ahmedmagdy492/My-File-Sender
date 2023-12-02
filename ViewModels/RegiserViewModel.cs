using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.ViewModels
{
    public class RegiserViewModel
    {
        [Required]
        [RegularExpression("^[A-Za-z]+[0-9]*$")]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
