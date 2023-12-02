using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Helpers
{
    public class Sha256Hashing : IHashing
    {
        private readonly SHA256 sha256;
        private readonly IConfiguration configuration;

        public Sha256Hashing(IConfiguration configuration)
        {
            sha256 = SHA256.Create();
            this.configuration = configuration;
        }

        public string Hash(string plainText)
        {
            string textAndKey = configuration.GetSection("Options").GetValue<string>("Key") + plainText;
            byte[] input = Encoding.UTF8.GetBytes(textAndKey);
            return Utility.DecodeHex(Encoding.UTF8.GetString(sha256.ComputeHash(input)));
        }
    }
}
