using FTP_Client.HelperModels;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Helpers
{
    public class ConfigReader : IConfigReader
    {
        private readonly IConfiguration _configuration;

        public ConfigReader(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public ConfigModel ReadConfiguration()
        {
            var optionsSection = _configuration.GetSection("Options");

            return new ConfigModel
            {
                Key = optionsSection.GetValue<string>("Key"),
                LocalStartupPath = optionsSection.GetValue<string>("LocalStartupPath")
            };
        }
    }
}
