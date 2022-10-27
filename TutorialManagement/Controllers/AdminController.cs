using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TutorialManagement.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult ManageUsers()
        {
            return View();
        }
    }
}