using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Web;
using System.Web.Mvc;
using FHP_VO;
using FHP_BM;
using FHP_DL;
using FHP.Helper;
using System.Reflection;


namespace FHP.Controllers
{
    public class HomeController : Controller
    {
        EntityHandle entityHandle;       
        string connectionString;

        public ActionResult Index()
        {
            entityHandle = HttpContext.Application["BLObject_Employee"] as EntityHandle;
            connectionString = HttpContext.Application["ConnectionString"] as string;  
          
            entityHandle.EmployeeDatObject = new FileHandingDB(connectionString);
            List<EmployeeData> objList = entityHandle.ReadAllDataData();
           
            cls_XMLHelper xMLHelper = new cls_XMLHelper();
            Session["xmlFilePath"] = Server.MapPath("~/App_Data/Employees.xml");
            Session["xmlHelperObject"] = xMLHelper;

            xMLHelper.StoreEmployeesDataIntoXML(objList, Session["xmlFilePath"] as string);
            return View(objList);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
       
        public ActionResult Login()
        {
            //validateUsers.UserDataObject = new ReadUsersDataDB(connectionString);          
            return View();
        }
        [HttpPost]
        public ActionResult Index(User model)
        {
            ValidateUsers validateUsers = new ValidateUsers();
            if (ModelState.IsValid)
            {
                connectionString = "Server=DESKTOP-26MMTP5;Database=MVC_Demo;Trusted_Connection=True; TrustServerCertificate=True";
                validateUsers.UserDataObject = new ReadUsersDataDB(connectionString);
              
                bool  IsUserExist = validateUsers.isUserPresent(model);
                if (IsUserExist)
                {

                    return RedirectToAction("Index", "Home");

                }
                else
                {
                    model.ErrorMessage = string.Empty;
                    return RedirectToAction("Login", "Home");                    
                }
            }
            return RedirectToAction("Login", "Home");
            
        }


        public ActionResult Views(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return View("Error");
            }

            cls_XMLHelper xmlHelper = Session["xmlHelperObject"] as cls_XMLHelper;
            string xmlFilePath = Session["xmlFilePath"] as string;

            if (xmlHelper == null || string.IsNullOrEmpty(xmlFilePath))
            {
                return View("Error");
            }

            List<EmployeeData> employeesList = xmlHelper.ParseEmployeesFromXML(xmlFilePath);
            EmployeeData empToUpdate = employeesList.FirstOrDefault(x => x.SrNo == long.Parse(id));

            if (empToUpdate == null)
            {
                return View("Error");
            }
            ViewData["Action"] = "Update";
            return View("New", empToUpdate);
        }
      
        public ActionResult New()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }


        [HttpPost]
        public ActionResult New(EmployeeData model)
            {          
            // Create a Record instance
            entityHandle = HttpContext.Application["BLObject_Employee"] as EntityHandle;
            ValueObject_VO Value_object = HttpContext.Application["Object"] as ValueObject_VO;
            connectionString = HttpContext.Application["ConnectionString"] as string;        
            EmployeeData newRecord = new EmployeeData
            {
                SrNo = model.SrNo,
                FirstName = model.FirstName,
                MiddleName = model.MiddleName,
                LastName = model.LastName,
                Prefix = model.Prefix,
                DOB = model.DOB,
                DOJ =model.DOJ,
                CurrentAddress = model.CurrentAddress,
                CurrentCompany = model.CurrentCompany,
                Qualification = model.Qualification,
            };
            Value_object.EmployeeData = newRecord;                
            entityHandle.AddData(model);                   
            return RedirectToAction("Index", "Home");          
        }


        public ActionResult Pagination(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return View("Error");
            }

            cls_XMLHelper xmlHelper = Session["xmlHelperObject"] as cls_XMLHelper;
            string xmlFilePath = Session["xmlFilePath"] as string;

            if (xmlHelper == null || string.IsNullOrEmpty(xmlFilePath))
            {
                return View("Error");
            }

            List<EmployeeData> employeesList = xmlHelper.ParseEmployeesFromXML(xmlFilePath);
            EmployeeData empToUpdate = employeesList.FirstOrDefault(x => x.SrNo == long.Parse(id));

            if (empToUpdate == null)
            {
                return View("Error");
            }

            ViewData["Action"] = "View";
            return View("New", empToUpdate);
        }

        public ActionResult Update(string id)
        {
            
            if (string.IsNullOrEmpty(id))
            {
                return View("Error");
            }

            cls_XMLHelper xmlHelper = Session["xmlHelperObject"] as cls_XMLHelper;
            string xmlFilePath = Session["xmlFilePath"] as string;

            if (xmlHelper == null || string.IsNullOrEmpty(xmlFilePath))
            {
                return View("Error");
            }

            List<EmployeeData> employeesList = xmlHelper.ParseEmployeesFromXML(xmlFilePath);
            EmployeeData empToUpdate = employeesList.FirstOrDefault(x => x.SrNo == long.Parse(id));

            if (empToUpdate == null)
            {
                return View("Error");
            }
            ViewData["Action"] = "Update";
            return View("New", empToUpdate);
        }
        [HttpPost]
        public ActionResult Update(EmployeeData updatedEmp)
        {
            entityHandle = HttpContext.Application["BLObject_Employee"] as EntityHandle;
            ValueObject_VO Value_object = HttpContext.Application["Object"] as ValueObject_VO;
            connectionString = HttpContext.Application["ConnectionString"] as string;
            EmployeeData newRecord = new EmployeeData
            {
                SrNo = updatedEmp.SrNo,
                FirstName = updatedEmp.FirstName,
                MiddleName = updatedEmp.MiddleName,
                LastName = updatedEmp.LastName,
                Prefix = updatedEmp.Prefix,
                DOB = updatedEmp.DOB,
                DOJ = updatedEmp.DOJ,
                CurrentAddress = updatedEmp.CurrentAddress,
                CurrentCompany = updatedEmp.CurrentCompany,
                Qualification = updatedEmp.Qualification,
            };
            Value_object.EmployeeData = newRecord;
            entityHandle.UpdateData(updatedEmp);
            return RedirectToAction("Index", "Home");          
        }


        [HttpPost]
        public ActionResult Delete(string[] ids)
        {
            bool isUserValid = true;
            EntityHandle entityHandle = HttpContext.Application["BLObject_Employee"] as EntityHandle;
            List<EmployeeData> x = Session["employeeList"] as List<EmployeeData>;
            

            foreach (string serialNo in ids)
            {
                long serial = long.Parse(serialNo);
                EmployeeData empToBeDelete = entityHandle.ReadAllDataData().Find(s => s.SrNo == serial);
               // entityHandle.(empToBeDelete);

            }

            if (isUserValid)
            {
                return Json(new { success = true });
            }
            else
            {
                return Json(new { success = false });
            }
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }
    }
}