using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.ViewModels
{
    public class UploadFileViewModel
    {
        public string FileName { get; set; }
        [Required]
        public string Base64 { get; set; }
        public string MimeType { get; set; }
    }
}
