using FTP_Client.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FTP_Client.Repository
{
    public interface IConnectionRepository
    {
        List<Connection> GetConnectionsBy(Func<Connection, bool> exp);
        Task<Connection> CreateConnection(Connection connection);
        Task<bool> DeleteConnection(Connection connection);
        Task<List<Connection>> GetConnectionsByUserID(long? userId);
        Task<Connection> GetConnectionByID(string connectionID);
        Task<bool> Update(Connection connection);
    }
}