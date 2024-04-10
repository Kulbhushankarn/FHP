using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FHP_VO;
using FHP_BM;
using FHP_DL;

namespace FHP.App_Start
{
    public class Init_cls
    {
        public void initilization() 
        {

            EntityHandle entityHandle = new EntityHandle();
            ValueObject_VO Object = new ValueObject_VO();
            User user = new User();
            string  connectionString = "Server=DESKTOP-26MMTP5;Database=MVC_Demo;Trusted_Connection=True; TrustServerCertificate=True";
            entityHandle.EmployeeDatObject = new FileHandingDB(connectionString);
            

            HttpContext.Current.Application["BLObject_Employee"] = entityHandle;
            HttpContext.Current.Application["BLObject_User"] = user;
            HttpContext.Current.Application["Object"] = Object;
            HttpContext.Current.Application["ConnectionString"] = connectionString;


        }

    }
}