using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.HelperModels
{
    public class FileContent
    {
        public byte[] Content { get; set; }
        public string FileName { get; set; }
        public string FullPath { get; set; }
    }
}
