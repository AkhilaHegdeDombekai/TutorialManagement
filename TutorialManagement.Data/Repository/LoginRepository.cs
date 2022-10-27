using Dapper;
using System.Data;
using TutorialManagement.Data.Connection;
using TutorialManagement.Data.Models;

namespace TutorialManagement.Data.Repository
{
    public class LoginRepository
    {
        private IDbConnection _dbConnection;
        public LoginRepository(IDbConnection dbConnection)
        {
            if (dbConnection != null)
                _dbConnection = dbConnection;
        }
        public int AuthenticateLogin(Login login)
        {
            var param = new DynamicParameters();
            param.Add("UserName", login.UserName);
            param.Add("Password", login.Password);
            param.Add("UserId", dbType: DbType.Int32, direction: ParameterDirection.Output);
            const string sqlProcedure = "";
            _dbConnection = ConnectionSettings.Connection();
            _dbConnection.Execute(sqlProcedure, param, commandType: CommandType.StoredProcedure);
            return param.Get<int>("UserId");

        }

    }
}
