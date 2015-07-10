<%@ Application Language="C#" %>

<script runat="server">

    public const string HEADER_ECHO_NAME = "X-Echo-info";
    public const string HEADER_TO_COOKIE = "X-To-Cookie";
    public const string COOKIE_TOKEN_CID = "SharedCookie";
    
    void Application_Start(object sender, EventArgs e) 
    {
        // Code that runs on application startup
    }

    protected void Application_BeginRequest(object sender, EventArgs e)
    {
        var serverIdent = string.Format("{0}-{1}", Environment.MachineName, (new Random().Next(1, 4)));
            
        // Check if we shoud track server behaviour
        if (Request.Headers.AllKeys.Contains(HEADER_ECHO_NAME))
        {
            // Record the start time for the server request
            var ident = Request.Headers[HEADER_ECHO_NAME];
            Response.AppendHeader(ident, serverIdent);
        }

        // Check if we should update the headers 
        if (Request.Headers.AllKeys.Contains(HEADER_TO_COOKIE))
        {
            // Record the end time for the server request
            var ident = Request.Headers[HEADER_TO_COOKIE];
            var cookie = new HttpCookie(ident, serverIdent);
            Response.Cookies.Add(cookie);
        }

        if (!Request.Cookies.AllKeys.Contains(COOKIE_TOKEN_CID))
        {
            Response.Cookies.Add(new HttpCookie(COOKIE_TOKEN_CID, Guid.NewGuid().ToString()));
        }
    }

    protected void Application_EndRequest(object sender, EventArgs e)
    {        
    }
    
    void Application_End(object sender, EventArgs e) 
    {
        //  Code that runs on application shutdown

    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        // Code that runs when an unhandled error occurs

    }

    void Session_Start(object sender, EventArgs e) 
    {
        // Code that runs when a new session is started

    }

    void Session_End(object sender, EventArgs e) 
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }
       
</script>
