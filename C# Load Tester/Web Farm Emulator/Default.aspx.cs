using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected string DisplayName { get; set; }

    protected void Page_Load(object sender, EventArgs e)
    {
        DisplayName = string.Format("Load Balanced Server #{0}", new Random().Next(1, 5));
    }
}