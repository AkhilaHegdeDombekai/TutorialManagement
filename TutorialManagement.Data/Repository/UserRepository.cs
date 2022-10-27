using Dapper;
using System.Data;
using TutorialManagement.Data.Connection;
using TutorialManagement.Data.Models;

namespace TutorialManagement.Data.Repository
{
    public class UserRepository
    {
        private IDbConnection _dbConnection;
        public UserRepository(IDbConnection dbConnection)
        {
            if (dbConnection != null)
                _dbConnection = dbConnection;
        }
        public User GetLoggedInUserDetail(int userId)
        {
            var param = new DynamicParameters();
            param.Add("UserName", userId);
            const string sqlProcedure = "";
            _dbConnection = ConnectionSettings.Connection();
            return _dbConnection.QuerySingle<User>(sqlProcedure, param, commandType: CommandType.StoredProcedure);
        }
    }
}
