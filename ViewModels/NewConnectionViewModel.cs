using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.ViewModels
{
    public class NewConnectionViewModel
    {
        [Required]
        public string ConnectionName { get; set; }
        [Required]
        [RegularExpression(@"^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$", ErrorMessage = "Incorrect IP Address Format (e.g. 192.168.1.1)")]
        public string IPAddress { get; set; }
        [Required]
        public int? Port { get; set; }
        public long? UserID { get; set; }
    }
}
