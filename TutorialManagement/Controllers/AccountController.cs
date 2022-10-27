using System.Web.Mvc;
using TutorialManagement.Data.Models;
using TutorialManagement.Data.Repository;

namespace TutorialManagement.Controllers
{
    public class AccountController : Controller
    {
        private LoginRepository _loginRepository;
        private UserRepository _userRepository;

        //public AccountController(LoginRepository loginRepository, UserRepository userRepository)
        //{
        //    if (loginRepository != null)
        //        _loginRepository = loginRepository;
        //    if (userRepository != null)
        //        _userRepository = userRepository;
        //}
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(Login login)
        {
            //var  resLogin= _loginRepository.AuthenticateLogin(login);
            //if (resLogin > 0)
            //{
            //    _userRepository.GetLoggedInUserDetail(resLogin);
               
            //}
            return RedirectToAction("Index", "Home");
        }
    }
}