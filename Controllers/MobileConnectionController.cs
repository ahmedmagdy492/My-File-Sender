using FTP_Client.Helpers;
using FTP_Client.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Net.Codecrete.QrCodeGenerator;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Controllers
{
    public class MobileConnectionController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IHostEnvironment _hostEnvironment;
        private readonly ILogger<MobileConnectionController> _logger;

        public MobileConnectionController(IConfiguration configuration, IHostEnvironment hostEnvironment, ILogger<MobileConnectionController> logger)
        {
            _configuration = configuration;
            _hostEnvironment = hostEnvironment;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GenerateCode()
        {
            string endPoint = _configuration["Options:UrlForQrCodeGeneration"];
            var qrCode = QrCode.EncodeText(endPoint, QrCode.Ecc.Medium);
            string svg = qrCode.ToSvgString(4);
            return StatusCode(200, new { success = true, message = "Success", errors = new List<string> { }, data = svg });
        }

        [HttpPost]
        [RequestSizeLimit(100_000_000)]
        public IActionResult SendFiles([FromBody]UploadFileViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    foreach (var err in ModelState.Values)
                    {
                        if (err.Errors.Count > 0)
                        {
                            _logger.LogError(err.Errors[0].ErrorMessage);
                        }
                    }
                    return BadRequest(new { success = false, message = "Invalid Input" });
                }

                SaveFile(Convert.FromBase64String(model.Base64), Guid.NewGuid().ToString("N") + Utility.GetExtension(model.MimeType));


                return StatusCode(200, new { success = true, message = "File was uploaded successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        #region Methods
        private void SaveFile(byte[] bytes, string filePath)
        {
            if(!Directory.Exists("Received"))
            {
                Directory.CreateDirectory("Received");
            }

            System.IO.File.WriteAllBytes(Path.Combine(_hostEnvironment.ContentRootPath, "Received", filePath), bytes);
        }
        #endregion
    }
}
