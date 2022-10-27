using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TutorialManagement.Data.Connection
{
   public class ConnectionSettings
    {
        public static readonly string DefaultConnectionString = ConfigurationManager.ConnectionStrings["DefaultConnectionString"].ToString();
        private static SqlConnection _connection;

        public static IDbConnection Connection()
        {
            _connection = new SqlConnection(DefaultConnectionString);
            if (_connection.State == ConnectionState.Closed)
            {
                _connection.Open();
            }
            return _connection;
        }
    }
}
