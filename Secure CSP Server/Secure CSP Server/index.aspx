<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="Secure_CSP_Server.index" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <base href="/" target="_top" />
    <title>Content Security Policies</title>
    <link href="app.css" rel="stylesheet" />
    <!-- 
    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    -->
</head>
<body class="container">
    <form runat="server" class="row">
        <div class="col-md-12">
            <asp:MultiView ID="mvHeader" runat="server" ActiveViewIndex="0">
                <asp:View ID="View1" runat="server">
                    <h2>
                        <span class="pull-right top-controls">
                            <a class="btn btn-sm btn-default" href="javascript:var KICKASSVERSION='2.0';var s = document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='//hi.kickassapp.com/kickass.js';void(0);" onclick="ReportRefresh()">
                                <i class="fa fa-space-shuttle" title="Space Invade!"></i>
                            </a>
                            <span id="dynamic_links"></span>
                            <a class="btn btn-sm btn-default" href="index.aspx">
                                <i class="fa fa-refresh" title="Refresh Page"></i>
                            </a>
                        </span>
                        <asp:LinkButton ID="lnkSecure" runat="server" OnClick="lnkSecure_Click" CssClass="glow-green">
                            <i class="fa fa-lock"></i>
                            <strong>SECURED</strong>
                        </asp:LinkButton>
                        <small class="text-success">This web page is protected with a <a href="http://www.html5rocks.com/en/tutorials/security/content-security-policy/" target="_blank">Content Security Policy</a>.</small>
                    </h2>
                </asp:View>
                <asp:View ID="View2" runat="server">
                    <h2>
                        <span class="pull-right top-controls">
                            <a class="btn btn-sm btn-default" href="javascript:var KICKASSVERSION='2.0';var s = document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='//hi.kickassapp.com/kickass.js';void(0);" onclick="ReportRefresh()">
                                <i class="fa fa-space-shuttle" title="Space Invade!"></i>
                            </a>
                            <span id="dynamic_links"></span>
                            <a class="btn btn-sm btn-default" href="index.aspx">
                                <i class="fa fa-refresh" title="Refresh Page"></i>
                            </a>
                        </span>
                        <asp:LinkButton ID="lnkInsecure" runat="server" OnClick="lnkSecure_Click" CssClass="glow-red">
                                    <i class="fa fa-unlock-alt"></i>
                                    <strong>INSECURE!</strong>
                        </asp:LinkButton>
                        <small class="text-danger">Content Security Policy has been disabled for this page.</small>
                    </h2>
                </asp:View>
            </asp:MultiView>
            <hr />
        </div>
        <div class="col-md-2">
            <asp:BulletedList ID="blLeftMenu" runat="server"
                OnClick="blLeftMenu_Click"
                DisplayMode="LinkButton"
                CssClass="nav nav-pills nav-stacked">
                <asp:ListItem Text="Overview" Value="0" class="active"></asp:ListItem>
                <asp:ListItem Text="Security Settings" Value="2"></asp:ListItem>
                <asp:ListItem Text="Current Policies" Value="1"></asp:ListItem>
                <asp:ListItem Text="Reported Attacks" Value="3"></asp:ListItem>
            </asp:BulletedList>
        </div>
        <div class="col-md-10">
            <asp:MultiView ID="mvContents" runat="server" ActiveViewIndex="0">
                <asp:View ID="viewOverview" runat="server">
                    <div class="col-md-8">
                        <asp:MultiView ID="mvToggleActiveMain" runat="server">
                            <asp:View ID="View3" runat="server">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="thumbnail alert alert-success">
                                            <div class="large-thumb">
                                                <i class="fa fa-check fa-4x"></i>
                                            </div>
                                            <div class="caption">
                                                <h3>Page is secure</h3>
                                                <p>
                                                    The <em>Content Security Policy</em> (CSP) has been set on this web page.
                                                </p>
                                                <p>
                                                    <asp:LinkButton ID="lnkViewSettings" OnClick="lnkViewSettings_Click" CssClass="btn btn-success" runat="server">Configure CSP</asp:LinkButton>
                                                    <asp:LinkButton ID="lnkDisableCSP" OnClick="lnkSecure_Click" CssClass="btn btn-warning" runat="server">Disable CSP</asp:LinkButton>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="thumbnail alert alert-info">
                                            <div class="large-thumb">
                                                <i class="fa fa-eye-slash fa-4x"></i>
                                            </div>
                                            <div class="caption">
                                                <h3>Restricting Resources</h3>
                                                <p>
                                                    Only trusted resources will be allowed to interact with this page.
                                                </p>
                                                <p>
                                                    <asp:LinkButton ID="btnShowPolicy" CssClass="btn btn-primary" OnClick="btnShowPolicy_Click" runat="server">Show Policy</asp:LinkButton>
                                                    <asp:LinkButton ID="btnViewReports" CssClass="btn btn-default" OnClick="btnViewReports_Click" runat="server">View Reports</asp:LinkButton>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </asp:View>
                            <asp:View ID="View4" runat="server">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="thumbnail alert alert-danger">
                                            <div class="large-thumb">
                                                <i class="fa fa-bug fa-4x"></i>
                                            </div>
                                            <div class="caption">
                                                <h3 class="text-danger">Page NOT secured!</h3>
                                                <p>
                                                    <b>Danger:</b> No <em>Content Security Policy</em> (CSP) has been set on this page.
                                                </p>
                                                <p>
                                                    <asp:LinkButton ID="LinkButton4" OnClick="lnkViewSettings_Click" CssClass="btn btn-default" runat="server" disabled>Configure CSP</asp:LinkButton>
                                                    <asp:LinkButton ID="LinkButton3" OnClick="lnkSecure_Click" CssClass="btn btn-danger" runat="server">Enable CSP</asp:LinkButton>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="thumbnail alert alert-warning">
                                            <div class="large-thumb">
                                                <i class="fa fa-eye fa-4x"></i>
                                            </div>
                                            <div class="caption">
                                                <h3>Open to attack!</h3>
                                                <p>
                                                    This page is <b>open to attacks using script injection</b> and other vectors.
                                                </p>
                                                <p>
                                                    <asp:LinkButton ID="LinkButton5" CssClass="btn btn-default" OnClick="btnShowPolicy_Click" runat="server">Show Policy</asp:LinkButton>
                                                    <asp:LinkButton ID="LinkButton6" CssClass="btn btn-warning" OnClick="btnViewReports_Click" runat="server">View Reports</asp:LinkButton>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </asp:View>
                        </asp:MultiView>
                    </div>
                    <div class="col-md-4">
                        <h4>
                            <span class="pull-right">
                                <asp:LinkButton ID="RefreshSummary" ClientIDMode="Static" runat="server" CssClass="btn btn-xs btn-default" OnClick="RefreshList_Click">
                                    <i class="fa fa-refresh"></i>
                                </asp:LinkButton>
                                <asp:LinkButton ID="LinkButton2" runat="server" CssClass="btn btn-xs btn-default" OnClick="ClearList_Click" Visible='<%# Reports.Count != 0 %>'>
                                    <i class="fa fa-trash"></i>
                                </asp:LinkButton>
                            </span>
                            Reported Attacks:
                        </h4>
                        <asp:Panel ID="Panel1" runat="server" Visible='<%# Reports.Count == 0 %>'>
                            <div class="alert alert-success">
                                <i class="fa fa-check"></i> No reported attacks...
                            </div>
                        </asp:Panel>
                        <asp:Repeater ID="Repeater2" runat="server" DataSource='<%# Reports.Where(r => r.SessionID == Options.SessionID.ToString()) %>' Visible='<%# Reports.Count > 0 %>'>
                            <HeaderTemplate>
                                <ul class="list-group">
                            </HeaderTemplate>
                            <ItemTemplate>
                                <li class="list-group-item list-group-item-danger compact-list">
                                    <span class="label label-default label-fixed">
                                        <asp:Label runat="server" ID="Label2" Text='<%# string.Format("{0:hh:mm:ss}", Eval("CreatedAt")) %>' />
                                    </span>
                                    <asp:LinkButton ID="EffectiveDirective" runat="server" Text='<%# Eval("Data.EffectiveDirective") %>' CssClass="label label-danger label-fixed"></asp:LinkButton>
                                    <asp:LinkButton ID="lnkToggleExpand" runat="server" Text="Attack Detected!" CssClass="text-danger ellipses" OnClick="lnkToggleExpand_Click"></asp:LinkButton>                                    
                                </li>
                            </ItemTemplate>
                            <FooterTemplate>
                                </ul>
                            </FooterTemplate>
                        </asp:Repeater>
                    </div>
                </asp:View>
                <asp:View ID="viewPolicy" runat="server">
                    <% 
                        if (Options.Enabled)
                        { 
                    %>
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">meta:http-equiv="Content-Security-Policy"</h3>
                        </div>
                        <pre class="thumbnail panel-body" style="margin: 0; overflow: scroll;"><% Response.Write(HeaderCSP); %></pre>
                    </div>
                    <% 
                        }
                        else
                        {
                    %>
                    <div class="panel panel-danger">
                        <div class="panel-heading">
                            <h3 class="panel-title">Warning: Missing CSP header!</h3>
                        </div>
                        <div class="thumbnail panel-body" style="margin: 0;">
                            <em>Please note: No "Content-Security-Policy" has been set for this server. This site is vulnerable to attacks!</em>
                        </div>
                    </div>
                    <%
                        }
                    %>
                </asp:View>
                <asp:View ID="viewSettings" runat="server">
                    <div class="form-horizontal thumbnail col-md-12" style="padding: 16px;">
                        <fieldset>
                            <!-- Form Name -->
                            <legend>Security Setup
                                <span class="pull-right">
                                    <asp:LinkButton ID="btnSubmit" CssClass="btn btn-xs btn-primary" Text="Update Settings" runat="server" OnClick="btnSubmit_Click"></asp:LinkButton>
                                    <asp:LinkButton ID="btnReset" CssClass="btn btn-xs btn-warning" Text="Reset Defaults" runat="server" OnClick="btnReset_Click" OnClientClick="return confirm('Are you sure?')"></asp:LinkButton>
                                </span>
                            </legend>

                            <!-- Multiple Checkboxes -->
                            <div class="form-group">

                                <asp:Repeater ID="SelectedOptions" runat="server" DataSource='<%# Options.Sources %>'>
                                    <HeaderTemplate>
                                        <label class="col-md-2 control-label" for="cspOptions">Restrict Sources</label>
                                        <div class="col-md-10">
                                            <div class="checkbox-inline">
                                                <label>
                                                    <asp:CheckBox ID="cspOption" runat="server" Checked="true" Text="default" Enabled="false" ForeColor="LightGray" />
                                                </label>
                                            </div>
                                    </HeaderTemplate>
                                    <ItemTemplate>
                                        <div class="checkbox-inline">
                                            <label>
                                                <asp:CheckBox ID="cspOption" runat="server" Checked='<%# Eval("Enabled") %>' Text='<%# Eval("Ident") %>' AutoPostBack="true" OnCheckedChanged="cspOption_CheckedChanged" />
                                            </label>
                                        </div>
                                    </ItemTemplate>
                                    <FooterTemplate>
                                        </div>
                                    </FooterTemplate>
                                </asp:Repeater>

                            </div>

                            <asp:Repeater ID="SourceList" runat="server" DataSource='<%# Options.Sources %>'>
                                <HeaderTemplate>
                                    <hr />
                                    <asp:Panel ID="pnlContents" runat="server" CssClass="form-group" Visible='<%# Options.Defaults.Enabled %>'>
                                        <label class="col-md-2 control-label" for="txtFormActions">Sources (default)</label>
                                        <div class="col-md-10">
                                            <asp:TextBox ID="txtValue" ToolTip='<%# Options.Defaults.Ident %>' CssClass="form-control" Text='<%# Options.Defaults.Value %>' runat="server" TextMode="MultiLine" Rows='<%# CountLines(Options.Defaults.Value) %>' OnTextChanged="txtValue_TextChanged" AutoPostBack="true"></asp:TextBox>
                                        </div>
                                    </asp:Panel>
                                </HeaderTemplate>
                                <ItemTemplate>
                                    <asp:Panel ID="pnlContents" runat="server" CssClass="form-group" Visible='<%# Eval("Enabled") %>'>
                                        <asp:Label runat="server" ID="Label1" CssClass="col-md-2 control-label" Font-Bold="true" Text='<%# string.Format("Sources ({0})",Eval("Ident")) %>' />
                                        <div class="col-md-10">
                                            <asp:TextBox ID="txtValue" ToolTip='<%# Eval("Ident") %>' CssClass="form-control" Text='<%# Eval("Value") %>' runat="server" TextMode="MultiLine" Rows='<%# CountLines(Eval("Value")) %>' OnTextChanged="txtValue_TextChanged" AutoPostBack="true"></asp:TextBox>
                                        </div>
                                    </asp:Panel>
                                </ItemTemplate>
                                <FooterTemplate>
                                    <hr />
                                </FooterTemplate>
                            </asp:Repeater>


                            <!-- Prepended checkbox -->
                            <div class="form-group">
                                <label class="col-md-2 control-label" for="txtBaseURI">Set Base URI</label>
                                <div class="col-md-10">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <asp:CheckBox ID="chkEnableBaseURI" Checked='<%# Options.BaseUrlEnabled %>' AutoPostBack="true" OnCheckedChanged="chkEnableBaseURI_CheckedChanged" runat="server" />
                                        </span>
                                        <asp:TextBox ID="txtBaseURI" Text='<%# Options.BaseUrl %>' ClientIDMode="Static" AutoPostBack="true" CssClass="form-control" placeholder="Enter the allowed base URI" runat="server"></asp:TextBox>
                                        <div class="input-group-btn">
                                            <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" disabled>Target <span class="caret"></span>
                                            </a>
                                            <ul class="dropdown-menu pull-right">
                                                <li><a href="#">_blank</a></li>
                                                <li><a href="#">_parent</a></li>
                                                <li><a href="#">_self</a></li>
                                                <li><a href="#">_top</a></li>
                                                <li><a href="#">{ iFrame }</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p class="help-block">Restricts the URLs that can appear in a pages 'base' element</p>
                                </div>
                            </div>


                            <!-- Prepended checkbox -->
                            <div class="form-group">
                                <label class="col-md-2 control-label" for="txtReportURI">Report Attacks To</label>
                                <div class="col-md-10">
                                    <div class="input-group">
                                        <span class="input-group-addon">
                                            <asp:CheckBox ID="chkEnableReportURL" Checked='<%# Options.ReportUrlEnabled %>' AutoPostBack="true" runat="server" OnCheckedChanged="chkEnableReportURL_CheckedChanged" />
                                        </span>
                                        <asp:TextBox ID="txtReportURI" Text='<%# Options.ReportUrl %>' ClientIDMode="Static" AutoPostBack="true" CssClass="form-control" placeholder="Enter URI to send report to" runat="server"></asp:TextBox>
                                    </div>
                                    <p class="help-block">This is the endpoint where CSP reports will be sent when attacks are detected.</p>
                                </div>
                            </div>

                            <!-- Textarea -->
                            <div class="form-group">
                                <label class="col-md-2 control-label" for="txtFrameAncestors">Frame Ancestors</label>
                                <div class="col-md-10">
                                    <textarea class="form-control" id="txtFrameAncestors" name="txtFrameAncestors" disabled>'none'</textarea>
                                </div>
                            </div>

                            <!-- Button Drop Down -->
                            <div class="form-group">
                                <label class="col-md-2 control-label" for="txtPlugins">Plugin Types</label>
                                <div class="col-md-10">
                                    <div class="input-group">
                                        <input id="txtPlugins" name="txtPlugins" class="form-control" placeholder="Enter plugin name" type="text" disabled>
                                        <div class="input-group-btn">
                                            <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" disabled>Show <span class="caret"></span>
                                            </a>
                                            <ul class="dropdown-menu pull-right">
                                                <li><a href="#">'self'</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </fieldset>
                    </div>
                </asp:View>
                <asp:View ID="viewMessages" runat="server">
                    <h3>
                        <span class="pull-right">
                            <!--
                            <img src="Transparent.gif" onload="ReportRefresh()" />
                            -->
                            <asp:LinkButton ID="RefreshList" ClientIDMode="Static" runat="server" CssClass="btn btn-xs btn-default" Text="Refresh" OnClick="RefreshList_Click"></asp:LinkButton>
                            <asp:LinkButton ID="ClearList" runat="server" CssClass="btn btn-xs btn-warning" Text="Clear Reports" OnClick="ClearList_Click"></asp:LinkButton>
                        </span>
                        Reported Attacks
                    </h3>

                    <asp:Panel ID="ReportsEmptyText" runat="server" Visible='<%# Reports.Count == 0 %>'>
                        <hr />
                        <div class="alert alert-success">
                            <i class="fa fa-check"></i>There has been no reported attacks for the current session...
                        </div>
                        <hr />
                    </asp:Panel>
                    <asp:Repeater ID="Repeater1" runat="server" DataSource='<%# Reports.Where(r => r.SessionID == Options.SessionID.ToString()) %>' Visible='<%# Reports.Count > 0 %>'>
                        <HeaderTemplate>
                            <hr />
                            <ul class="list-group">
                        </HeaderTemplate>
                        <ItemTemplate>
                            <li class="list-group-item list-group-item-danger compact-list">
                                <span class="label label-default label-fixed">
                                    <asp:Label runat="server" ID="Label2" Text='<%# string.Format("{0:hh:mm:ss}", Eval("CreatedAt")) %>' />
                                </span>
                                <asp:LinkButton ID="EffectiveDirective" runat="server" Text='<%# Eval("Data.EffectiveDirective") %>' CssClass="label label-danger label-fixed"></asp:LinkButton>
                                <asp:LinkButton ID="lnkToggleExpand" runat="server" Text='<%# Eval("Data.Description") %>' CssClass="text-danger" OnClick="lnkToggleExpand_Click"></asp:LinkButton>
                                <asp:HyperLink ID="HyperLink1" runat="server" Text="Source" CssClass="label label-primary pull-right" NavigateUrl='<%# Eval("Data.BlockedUri") %>' Visible='<%# !string.IsNullOrEmpty(""+Eval("Data.BlockedUri")) %>' Target="_blank"></asp:HyperLink>
                                <asp:Panel ID="ItemContents" runat="server" Visible="false">
                                    <pre class="text-report"><%# Eval("RawText") %></pre>
                                </asp:Panel>
                            </li>
                        </ItemTemplate>

                        <FooterTemplate>
                            </ul>
                            <hr />
                        </FooterTemplate>
                    </asp:Repeater>
                </asp:View>
            </asp:MultiView>
        </div>
        <div class="col-md-12 text-center">
            <hr />
            <em>
                <i class="fa fa-info-circle"></i>
                See this <a target="_blank" href="http://muaz-khan.blogspot.com/2012/06/exploring-csp-content-security-policy.html">Full CSP Reporter</a> for a more advanced implementation.                
            </em>
            |
            <a href="index.aspx?reset=true">Reset CSP Options</a>
        </div>
    </form>
    <script src="app.js"></script>
</body>
</html>
