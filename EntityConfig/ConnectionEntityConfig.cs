using FTP_Client.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FTP_Client.EntityConfig
{
    public class ConnectionEntityConfig : IEntityTypeConfiguration<Connection>
    {
        public void Configure(EntityTypeBuilder<Connection> builder)
        {
            builder.HasKey(conneciton => conneciton.ID);
            builder.HasOne(connection => connection.User).WithMany(user=> user.Connections);
            builder.HasIndex(connection => connection.ConnectionName).IsUnique(true);
        }
    }
}
