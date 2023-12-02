using FTP_Client.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Controllers
{
    public class PopupController : Controller
    {
        public IActionResult GetNewConnectionPopup()
        {
            return PartialView("Connections/_NewConnectionPopup");
        }
        
        public IActionResult GetConnectionUsernameAndPassword(string connectionID)
        {
            ViewBag.ConnectionID = connectionID;
            return PartialView("Connections/_ConnectionUsernameAndPassword");
        }
    }
}
