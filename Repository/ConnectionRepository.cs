using FTP_Client.EntityConfig;
using FTP_Client.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.Repository
{
    public class ConnectionRepository : IConnectionRepository
    {
        private readonly AppDBContext _context;

        public ConnectionRepository(AppDBContext context)
        {
            _context = context;
        }

        public List<Connection> GetConnectionsBy(Func<Connection, bool> exp)
        {
            return _context.Connections.Where(exp).ToList();
        }

        public Task<List<Connection>> GetConnectionsByUserID(long? userId)
        {
            return _context.Connections.Where(connection => connection.UserID == userId).ToListAsync();
        }

        public Task<Connection> GetConnectionByID(string connectionID)
        {
            return _context.Connections.FirstOrDefaultAsync(con => con.ID == connectionID);
        }

        public async Task<Connection> CreateConnection(Connection connection)
        {
            await _context.Connections.AddAsync(connection);
            await _context.SaveChangesAsync();
            return connection;
        }

        public async Task<bool> DeleteConnection(Connection connection)
        {
            _context.Entry(connection).State = EntityState.Deleted;
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Update(Connection connection)
        {
            _context.Entry(connection).State = EntityState.Modified;
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
