using Renci.SshNet;
using Renci.SshNet.Sftp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Helpers
{
    public class SFTPClient : IFTPClient
    {
        private readonly string _username;
        private readonly string _password;
        private readonly string _url;
        private readonly int _port;

        public SFTPClient(string url, int port)
        {
            _username = string.Empty;
            _password = string.Empty;
            _url = url;
            _port = port;
        }

        public SFTPClient(string url, int port, string username, string password) : this(url, port)
        {
            _username = username;
            _password = password;
        }

        public IEnumerable<ISftpFile> GetFiles(string path)
        {
            using (SftpClient sftpClient = new SftpClient(_url, _port, _username, _password))
            {
                sftpClient.Connect();

                IEnumerable<ISftpFile> files = sftpClient.ListDirectory(path);
                
                sftpClient.Disconnect();

                return files.ToList();
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="path">the path including the filename</param>
        /// <param name="data">the contents of the file in bytes</param>
        /// <exception cref="Exception">throws Exception if the transfer was not successfull</exception>
        public void UploadFile(string path, byte[] data)
        {
            using (SftpClient sftpClient = new SftpClient(_url, _port, _username, _password))
            {
                sftpClient.Connect();

                using (MemoryStream ms = new MemoryStream(data))
                {
                    sftpClient.UploadFile(ms, path);
                }

                sftpClient.Disconnect();
            }
        }

        /// <summary>
        /// </summary>
        /// <param name="path">the path of the file to be downloaded including the filename</param>
        /// <returns>the contents of the file in bytes</returns>
        /// <exception cref="Exception">throws an Exception if the file is download operation was not successfull</exception>
        public byte[] DownloadFile(string path)
        {
            using (SftpClient sftpClient = new SftpClient(_url, _port, _username, _password))
            {
                byte[] buffer = null;
                sftpClient.Connect();

                using (MemoryStream ms = new MemoryStream())
                {
                    sftpClient.DownloadFile(path, ms);
                    buffer = ms.ToArray();
                }

                sftpClient.Disconnect();
                return buffer;
            }
        }

    }
}
