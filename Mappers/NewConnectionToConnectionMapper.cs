using FTP_Client.Models;
using FTP_Client.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Mappers
{
    public class NewConnectionToConnectionMapper
    {
        public Connection Map(NewConnectionViewModel model)
        {
            return new Connection
            {
                ConnectionName = model.ConnectionName,
                IPAddress = model.IPAddress,
                Port = model.Port,
                UserID = model.UserID,
                LastConnectionDate = DateTime.Now
            };
        }
    }
}
