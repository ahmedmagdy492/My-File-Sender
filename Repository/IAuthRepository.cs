using FTP_Client.Models;
using FTP_Client.ViewModels;
using System.Threading.Tasks;

namespace FTP_Client.Repository
{
    public interface IAuthRepository
    {
        Task<bool> IsUsernameAlreadyTaken(string username);
        Task<User> Login(LoginViewModel model);
        Task<User> Register(User user);
    }
}