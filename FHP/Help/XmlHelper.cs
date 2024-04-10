using FHP_VO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace FHP.Helper
{
    public class cls_XMLHelper
    {
        public void StoreEmployeesDataIntoXML(List<EmployeeData> employeesList, string filePath)
        {

            XDocument xmlDoc = new XDocument(
          new XElement("Employees",
              employeesList.Select(u => new XElement("Employees",
                  new XElement("SerialNumber", u.SrNo),
                  new XElement("Prefix", u.Prefix),
                  new XElement("FirstName", u.FirstName),
                  new XElement("MiddleName", u.MiddleName),
                  new XElement("LastName", u.LastName),
                  new XElement("CurrentAddress", u.CurrentAddress),
                  new XElement("DOB", u.DOB),
                  new XElement("Education", u.Qualification),
                  new XElement("CurrentCompany", u.CurrentCompany),
                  new XElement("JoiningDate", u.DOJ)
              ))
          )
      );

            string xmlString = xmlDoc.ToString();
            System.IO.File.WriteAllText(filePath, xmlString);
        }

        public List<EmployeeData> ParseEmployeesFromXML(string filePath)
        {
            List<EmployeeData> employeesList = new List<EmployeeData>();

            XDocument xmlDoc = XDocument.Load(filePath);
            foreach (var employeeElement in xmlDoc.Root.Elements("Employees"))
            {
                EmployeeData employee = new EmployeeData
                {
                    SrNo = (int)employeeElement.Element("SerialNumber"),
                    Prefix = (string)employeeElement.Element("Prefix"),
                    FirstName = (string)employeeElement.Element("FirstName"),
                    MiddleName = (string)employeeElement.Element("MiddleName"),
                    LastName = (string)employeeElement.Element("LastName"),
                    CurrentAddress = (string)employeeElement.Element("CurrentAddress"),
                    DOB = (DateTime)employeeElement.Element("DOB"),
                    Qualification = (employeeElement.Element("Education").Value),
                    CurrentCompany = (string)employeeElement.Element("CurrentCompany"),
                    DOJ = (DateTime)employeeElement.Element("JoiningDate")
                };
                employeesList.Add(employee);
            }

            return employeesList;
        }

    }
}