using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Controllers
{
    [Authorize]
    public class DNSResolverController : Controller
    {
        private readonly IViewRenderService _viewRenderService;

        public DNSResolverController(IViewRenderService viewRenderService)
        {
            _viewRenderService = viewRenderService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Resolve(string domain)
        {
            try
            {
                if(string.IsNullOrWhiteSpace(domain))
                    return StatusCode(400, new { success = false, errors = new List<string> { "Invalid Domain Name" } });

                var ipAddresses = Dns.GetHostAddresses(domain).ToList();

                return StatusCode(200, new { success = true, errors = new List<string> { }, dnsResult = _viewRenderService.RenderToString("DNSResolver/_IPAddresses", ipAddresses) });
            }
            catch (Exception ex)
            {
                return StatusCode(400, new { success = false, errors = new List<string> { ex.Message } });
            }
        }
    }
}
