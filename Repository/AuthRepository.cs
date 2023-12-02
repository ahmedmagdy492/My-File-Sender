using FTP_Client.EntityConfig;
using FTP_Client.Models;
using FTP_Client.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDBContext _context;

        public AuthRepository(AppDBContext context)
        {
            _context = context;
        }

        public Task<User> Login(LoginViewModel model)
        {
            return _context.Users.FirstOrDefaultAsync(user => user.Username == model.Username && user.Password == model.Password);
        }

        public async Task<bool> IsUsernameAlreadyTaken(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Username == username);
            return user == null ? false : true;
        }

        public async Task<User> Register(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
