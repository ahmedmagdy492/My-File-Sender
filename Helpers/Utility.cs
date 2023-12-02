using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace FTP_Client.Helpers
{
    public static class Utility
    {
        public static string DecodeHex(string txt)
        {
            StringBuilder result = new StringBuilder();
            foreach (byte c in txt)
            {
                result.Append(c.ToString("x2"));
            }
            return result.ToString();
        }

        public static bool IsImage(string fileName)
        {
            string extension = Path.GetExtension(fileName);
            return extension == ".png" || extension == ".jpg" || extension == ".jpeg" || extension == ".ico";
        }

        public static bool IsFile(string file)
        {
            string extension = Path.GetExtension(file);
            return extension == ".txt" || extension == ".py" || extension == ".cs" || extension == ".js" || extension == ".json" || extension == ".xml" || extension == ".csv" || extension == ".java" || extension == ".vb";
        }

        public static string GetExtension(string mimeType)
        {
            switch (mimeType)
            {
                case "image/jpeg":
                    return ".jpg";
                case "image/png":
                    return ".png";
                case "application/pdf":
                    return ".pdf";
                case "video/mp4":
                case "audio/mp4":
                case "application/mp4":
                    return ".mp4";
            }
            return "";
        }
    }
}
