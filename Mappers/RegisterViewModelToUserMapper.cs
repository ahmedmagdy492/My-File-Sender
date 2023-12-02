using FTP_Client.Models;
using FTP_Client.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Mappers
{
    public class RegisterViewModelToUserMapper
    {
        public User Map(RegiserViewModel model)
        {
            return new User
            {
                Name = model.Name,
                Username = model.Username,
                Password = model.Password
            };
        }
    }
}
