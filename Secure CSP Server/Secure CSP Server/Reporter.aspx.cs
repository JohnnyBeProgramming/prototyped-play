using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Secure_CSP_Server
{
    public partial class Reporter : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (Request.HttpMethod == "POST")
                {
                    var file = Page.MapPath("~/reports/" + Guid.NewGuid() + ".json");
                    var json = GetInputData();
                    if (!string.IsNullOrEmpty(json))
                    {
                        File.WriteAllText(file, json);
                    }
                }
                else
                {
                    //throw new Exception("Reporter not available...");
                }
            }
            catch (Exception ex)
            {
                Response.ClearContent();
                Response.Write(ex.Message);
                Response.End();
            }
        }

        private string GetInputData()
        {
            Request.InputStream.Position = 0;
            using (StreamReader inputStream = new StreamReader(Request.InputStream))
            {
                string s = inputStream.ReadToEnd();
                if (!string.IsNullOrWhiteSpace(s))
                {
                    return s;
                }
            }

            return null;
        }
    }
}