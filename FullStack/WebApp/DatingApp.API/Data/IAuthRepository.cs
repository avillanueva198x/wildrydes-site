using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IAuthRepository
    {
        // TODO: Register
        Task<User> Register(User user, string password);
        //Login
        Task<User> Login(string username, string password);
        //UserExist
        Task<bool> UserExists(string username);
    }
}