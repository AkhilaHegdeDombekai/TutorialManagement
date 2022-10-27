using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TutorialManagement.Controllers
{
    public class DocumentController : Controller
    {
        // GET: Document
        [Route("Document/Upload")]
        public ActionResult UploadDocument()
        {
            return View();
        }
    }
}