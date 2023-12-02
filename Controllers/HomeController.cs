using FTP_Client.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly IConnectionRepository _connectionRepository;
        private readonly IViewRenderService _viewRenderService;

        public HomeController(IConnectionRepository connectionRepository, IViewRenderService viewRenderService)
        {
            _connectionRepository = connectionRepository;
            _viewRenderService = viewRenderService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetConnectionList()
        {
            try
            {
                var userID = HttpContext.User.Claims.ToList()[0].Value;
                var connections = await _connectionRepository.GetConnectionsByUserID(Convert.ToInt64(userID));

                return PartialView("Home/_ConnectionList", connections);
            }
            catch (Exception ex)
            {
                ViewBag.ErrorMsg = ex.Message;
                return PartialView("_Result");
            }
        }

        [HttpPost]
        public async Task<IActionResult> DeleteConnection(string connectionID)
        {
            try
            {
                if(string.IsNullOrWhiteSpace(connectionID))
                    return StatusCode(400, new { success = false, errors = new List<string> { "Invalid Connection ID" } });

                var connection = await _connectionRepository.GetConnectionByID(connectionID);
                if(connection == null)
                    return StatusCode(400, new { success = false, errors = new List<string> { "Invalid Connection ID" } });

                var deleteResult = await _connectionRepository.DeleteConnection(connection);
                if(!deleteResult)
                    return StatusCode(400, new { success = false, errors = new List<string> { "Error Occured while Deletting your Conneciton" } });

                var userID = HttpContext.User.Claims.ToList()[0].Value;
                var connections = await _connectionRepository.GetConnectionsByUserID(Convert.ToInt64(userID));

                return StatusCode(200, new { success = true, errors = new List<string> {  }, view = _viewRenderService.RenderToString("Home/_ConnectionList", connections) });
            }
            catch (Exception ex)
            {
                return StatusCode(400, new { success = false, errors = new List<string> { ex.Message } });
            }
        }
    }
}
