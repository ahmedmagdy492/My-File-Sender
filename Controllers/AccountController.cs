using FTP_Client.Helpers;
using FTP_Client.Mappers;
using FTP_Client.Models;
using FTP_Client.Repository;
using FTP_Client.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAuthRepository _authRepository;
        private readonly IHashing _hashing;

        public AccountController(IAuthRepository authRepository, IHashing hashing)
        {
            _authRepository = authRepository;
            _hashing = hashing;
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errorList = ValidationHelper.GetValidationErrMsgs(ModelState.Values);
                    return BadRequest(new { success = false, errors = errorList });
                }

                model.Password = _hashing.Hash(model.Password);
                var loginResult = await _authRepository.Login(model);
                if (loginResult == null)
                {
                    return BadRequest(new { success = false, errors = new List<string> { "Invalid Username or Password" } });
                }

                await HttpContext.SignInAsync(Autenticate(loginResult));

                return StatusCode(200, new { success = true, errors = new List<string> { }, redirectUrl = Url.Action("Index", "Home") });
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { success = false, errors = new List<string> { ex.Message } });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegiserViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errorList = ValidationHelper.GetValidationErrMsgs(ModelState.Values);
                    return BadRequest(new { success = false, errors = errorList });
                }

                var isUsernameTaken = await _authRepository.IsUsernameAlreadyTaken(model.Username);
                if (isUsernameTaken)
                {
                    ModelState.AddModelError("Username", "Username is Already Taken");
                    var errorList = ValidationHelper.GetValidationErrMsgs(ModelState.Values);
                    return BadRequest(new { success = false, errors = errorList });
                }

                model.Password = _hashing.Hash(model.Password);

                // mapping
                var user = new RegisterViewModelToUserMapper().Map(model);

                var registerAccount = await _authRepository.Register(user);
                return StatusCode(200, new { success = true, errors = new List<string> { }, redirectUrl = Url.Action("Login", "Account") });
            }
            catch (System.Exception ex)
            {
                // log error
                return BadRequest(new { success = false, errors = new List<string> { ex.Message } });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return StatusCode(200, new { success = true, redirectUrl = Url.Action("Login", "Account") });
        }

        #region Methods
        private ClaimsPrincipal Autenticate(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                new Claim(ClaimTypes.Name, user.Name.ToString()),
            };

            var identity = new ClaimsIdentity(claims, "CookieAuth");
            return new ClaimsPrincipal(new[] { identity });
        }
        #endregion
    }
}
