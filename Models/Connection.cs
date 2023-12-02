using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Models
{
    public class Connection
    {
        public Connection()
        {
            ID = Guid.NewGuid().ToString("N");
        }

        public string ID { get; set; }
        public string ConnectionName { get; set; }
        public string IPAddress { get; set; }
        public int? Port { get; set; }
        public long? UserID { get; set; }
        public DateTime? LastConnectionDate { get; set; }

        public User User { get; set; }
    }
}
