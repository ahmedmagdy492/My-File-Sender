using FTP_Client.HelperModels;

namespace FTP_Client.Helpers
{
    public interface IConfigReader
    {
        ConfigModel ReadConfiguration();
    }
}