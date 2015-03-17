namespace Web_Farm_Load_Tester
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainForm));
            this.tabContainer = new System.Windows.Forms.TabControl();
            this.tabWebPages = new System.Windows.Forms.TabPage();
            this.chkKeepOpen = new System.Windows.Forms.CheckBox();
            this.txtDelay = new System.Windows.Forms.TextBox();
            this.lblDelay = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.txtTrackerType = new System.Windows.Forms.ComboBox();
            this.btnCookies = new System.Windows.Forms.Button();
            this.btnHeaders = new System.Windows.Forms.Button();
            this.txtWebRegExGroup = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.txtWebConnections = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.btnWebTest = new System.Windows.Forms.Button();
            this.txtWebRegex = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.txtWebUrl = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.tabResults = new System.Windows.Forms.TabPage();
            this.panel1 = new System.Windows.Forms.Panel();
            this.chartAverages = new System.Windows.Forms.PictureBox();
            this.chartResults = new System.Windows.Forms.PictureBox();
            this.chartSpread = new System.Windows.Forms.PictureBox();
            this.MainContainer = new System.Windows.Forms.SplitContainer();
            this.lnkLoadConfig = new System.Windows.Forms.LinkLabel();
            this.lnkSaveConfig = new System.Windows.Forms.LinkLabel();
            this.gvWebResults = new System.Windows.Forms.DataGridView();
            this.colWebServerDesc = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colWebVersion = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.colWebHitCount = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.tabContainer.SuspendLayout();
            this.tabWebPages.SuspendLayout();
            this.tabResults.SuspendLayout();
            this.panel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.chartAverages)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chartResults)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.chartSpread)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.MainContainer)).BeginInit();
            this.MainContainer.Panel1.SuspendLayout();
            this.MainContainer.Panel2.SuspendLayout();
            this.MainContainer.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.gvWebResults)).BeginInit();
            this.SuspendLayout();
            // 
            // tabContainer
            // 
            this.tabContainer.Controls.Add(this.tabWebPages);
            this.tabContainer.Controls.Add(this.tabPage2);
            this.tabContainer.Controls.Add(this.tabResults);
            this.tabContainer.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabContainer.Location = new System.Drawing.Point(3, 3);
            this.tabContainer.Name = "tabContainer";
            this.tabContainer.SelectedIndex = 0;
            this.tabContainer.Size = new System.Drawing.Size(598, 114);
            this.tabContainer.TabIndex = 0;
            // 
            // tabWebPages
            // 
            this.tabWebPages.Controls.Add(this.chkKeepOpen);
            this.tabWebPages.Controls.Add(this.txtDelay);
            this.tabWebPages.Controls.Add(this.lblDelay);
            this.tabWebPages.Controls.Add(this.label5);
            this.tabWebPages.Controls.Add(this.txtTrackerType);
            this.tabWebPages.Controls.Add(this.btnCookies);
            this.tabWebPages.Controls.Add(this.btnHeaders);
            this.tabWebPages.Controls.Add(this.txtWebRegExGroup);
            this.tabWebPages.Controls.Add(this.label4);
            this.tabWebPages.Controls.Add(this.txtWebConnections);
            this.tabWebPages.Controls.Add(this.label3);
            this.tabWebPages.Controls.Add(this.btnWebTest);
            this.tabWebPages.Controls.Add(this.txtWebRegex);
            this.tabWebPages.Controls.Add(this.label2);
            this.tabWebPages.Controls.Add(this.txtWebUrl);
            this.tabWebPages.Controls.Add(this.label1);
            this.tabWebPages.Location = new System.Drawing.Point(4, 22);
            this.tabWebPages.Name = "tabWebPages";
            this.tabWebPages.Padding = new System.Windows.Forms.Padding(3);
            this.tabWebPages.Size = new System.Drawing.Size(590, 88);
            this.tabWebPages.TabIndex = 0;
            this.tabWebPages.Text = "Web Pages";
            this.tabWebPages.UseVisualStyleBackColor = true;
            // 
            // chkKeepOpen
            // 
            this.chkKeepOpen.AutoSize = true;
            this.chkKeepOpen.Location = new System.Drawing.Point(132, 64);
            this.chkKeepOpen.Name = "chkKeepOpen";
            this.chkKeepOpen.Size = new System.Drawing.Size(162, 17);
            this.chkKeepOpen.TabIndex = 47;
            this.chkKeepOpen.Text = "Keep request channels open";
            this.chkKeepOpen.UseVisualStyleBackColor = true;
            this.chkKeepOpen.CheckedChanged += new System.EventHandler(this.chkKeepOpen_CheckedChanged);
            // 
            // txtDelay
            // 
            this.txtDelay.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.txtDelay.Location = new System.Drawing.Point(413, 62);
            this.txtDelay.Name = "txtDelay";
            this.txtDelay.Size = new System.Drawing.Size(45, 20);
            this.txtDelay.TabIndex = 46;
            this.txtDelay.Text = "100";
            // 
            // lblDelay
            // 
            this.lblDelay.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.lblDelay.AutoSize = true;
            this.lblDelay.Location = new System.Drawing.Point(320, 65);
            this.lblDelay.Name = "lblDelay";
            this.lblDelay.Size = new System.Drawing.Size(87, 13);
            this.lblDelay.TabIndex = 45;
            this.lblDelay.Text = "Delay millisecons";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(1, 38);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(75, 13);
            this.label5.TabIndex = 44;
            this.label5.Text = "What to track:";
            // 
            // txtTrackerType
            // 
            this.txtTrackerType.FormattingEnabled = true;
            this.txtTrackerType.Items.AddRange(new object[] {
            "Response Text",
            "HTTP Headers",
            "HTTP Cookies"});
            this.txtTrackerType.Location = new System.Drawing.Point(81, 35);
            this.txtTrackerType.Name = "txtTrackerType";
            this.txtTrackerType.Size = new System.Drawing.Size(156, 21);
            this.txtTrackerType.TabIndex = 43;
            this.txtTrackerType.Text = "Response Text";
            // 
            // btnCookies
            // 
            this.btnCookies.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnCookies.Location = new System.Drawing.Point(419, 8);
            this.btnCookies.Name = "btnCookies";
            this.btnCookies.Size = new System.Drawing.Size(83, 22);
            this.btnCookies.TabIndex = 42;
            this.btnCookies.Text = "Cookies";
            this.btnCookies.UseVisualStyleBackColor = true;
            this.btnCookies.Click += new System.EventHandler(this.btnCookies_Click);
            // 
            // btnHeaders
            // 
            this.btnHeaders.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnHeaders.Location = new System.Drawing.Point(501, 8);
            this.btnHeaders.Name = "btnHeaders";
            this.btnHeaders.Size = new System.Drawing.Size(83, 22);
            this.btnHeaders.TabIndex = 41;
            this.btnHeaders.Text = "Headers";
            this.btnHeaders.UseVisualStyleBackColor = true;
            this.btnHeaders.Click += new System.EventHandler(this.btnHeaders_Click);
            // 
            // txtWebRegExGroup
            // 
            this.txtWebRegExGroup.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.txtWebRegExGroup.Location = new System.Drawing.Point(539, 35);
            this.txtWebRegExGroup.Name = "txtWebRegExGroup";
            this.txtWebRegExGroup.Size = new System.Drawing.Size(45, 20);
            this.txtWebRegExGroup.TabIndex = 40;
            this.txtWebRegExGroup.Text = "2";
            // 
            // label4
            // 
            this.label4.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(464, 38);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(73, 13);
            this.label4.TabIndex = 39;
            this.label4.Text = "Display Group";
            // 
            // txtWebConnections
            // 
            this.txtWebConnections.Location = new System.Drawing.Point(81, 62);
            this.txtWebConnections.Name = "txtWebConnections";
            this.txtWebConnections.Size = new System.Drawing.Size(45, 20);
            this.txtWebConnections.TabIndex = 38;
            this.txtWebConnections.Text = "5";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(1, 65);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(74, 13);
            this.label3.TabIndex = 37;
            this.label3.Text = "Request Limit:";
            // 
            // btnWebTest
            // 
            this.btnWebTest.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnWebTest.Location = new System.Drawing.Point(464, 59);
            this.btnWebTest.Name = "btnWebTest";
            this.btnWebTest.Size = new System.Drawing.Size(120, 25);
            this.btnWebTest.TabIndex = 36;
            this.btnWebTest.Text = "Load Test Servers";
            this.btnWebTest.UseVisualStyleBackColor = true;
            this.btnWebTest.Click += new System.EventHandler(this.btnWebTest_Click);
            // 
            // txtWebRegex
            // 
            this.txtWebRegex.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtWebRegex.Location = new System.Drawing.Point(343, 35);
            this.txtWebRegex.Name = "txtWebRegex";
            this.txtWebRegex.Size = new System.Drawing.Size(115, 20);
            this.txtWebRegex.TabIndex = 35;
            this.txtWebRegex.Text = "(<title>)(.*)(</title>)";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(243, 38);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(94, 13);
            this.label2.TabIndex = 34;
            this.label2.Text = "Match Expression:";
            // 
            // txtWebUrl
            // 
            this.txtWebUrl.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtWebUrl.Location = new System.Drawing.Point(81, 9);
            this.txtWebUrl.Name = "txtWebUrl";
            this.txtWebUrl.Size = new System.Drawing.Size(338, 20);
            this.txtWebUrl.TabIndex = 33;
            this.txtWebUrl.Text = "http://www.google.com";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(1, 12);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(74, 13);
            this.label1.TabIndex = 32;
            this.label1.Text = "Website URL:";
            // 
            // tabPage2
            // 
            this.tabPage2.Location = new System.Drawing.Point(4, 22);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage2.Size = new System.Drawing.Size(590, 88);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "Web Services";
            this.tabPage2.UseVisualStyleBackColor = true;
            // 
            // tabResults
            // 
            this.tabResults.Controls.Add(this.panel1);
            this.tabResults.Controls.Add(this.chartSpread);
            this.tabResults.Location = new System.Drawing.Point(4, 22);
            this.tabResults.Name = "tabResults";
            this.tabResults.Padding = new System.Windows.Forms.Padding(3);
            this.tabResults.Size = new System.Drawing.Size(590, 88);
            this.tabResults.TabIndex = 2;
            this.tabResults.Text = "Load Test Results";
            this.tabResults.UseVisualStyleBackColor = true;
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.chartAverages);
            this.panel1.Controls.Add(this.chartResults);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(3, 3);
            this.panel1.Margin = new System.Windows.Forms.Padding(0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(334, 82);
            this.panel1.TabIndex = 2;
            // 
            // chartAverages
            // 
            this.chartAverages.Dock = System.Windows.Forms.DockStyle.Fill;
            this.chartAverages.Location = new System.Drawing.Point(0, 50);
            this.chartAverages.Name = "chartAverages";
            this.chartAverages.Size = new System.Drawing.Size(334, 32);
            this.chartAverages.TabIndex = 2;
            this.chartAverages.TabStop = false;
            this.chartAverages.Click += new System.EventHandler(this.chartImage_Click);
            // 
            // chartResults
            // 
            this.chartResults.Dock = System.Windows.Forms.DockStyle.Top;
            this.chartResults.Location = new System.Drawing.Point(0, 0);
            this.chartResults.Name = "chartResults";
            this.chartResults.Size = new System.Drawing.Size(334, 50);
            this.chartResults.TabIndex = 1;
            this.chartResults.TabStop = false;
            this.chartResults.Click += new System.EventHandler(this.chartImage_Click);
            // 
            // chartSpread
            // 
            this.chartSpread.Dock = System.Windows.Forms.DockStyle.Right;
            this.chartSpread.Location = new System.Drawing.Point(337, 3);
            this.chartSpread.Name = "chartSpread";
            this.chartSpread.Size = new System.Drawing.Size(250, 82);
            this.chartSpread.TabIndex = 1;
            this.chartSpread.TabStop = false;
            this.chartSpread.Click += new System.EventHandler(this.chartImage_Click);
            // 
            // MainContainer
            // 
            this.MainContainer.Dock = System.Windows.Forms.DockStyle.Fill;
            this.MainContainer.FixedPanel = System.Windows.Forms.FixedPanel.Panel1;
            this.MainContainer.Location = new System.Drawing.Point(0, 0);
            this.MainContainer.Name = "MainContainer";
            this.MainContainer.Orientation = System.Windows.Forms.Orientation.Horizontal;
            // 
            // MainContainer.Panel1
            // 
            this.MainContainer.Panel1.Controls.Add(this.lnkLoadConfig);
            this.MainContainer.Panel1.Controls.Add(this.lnkSaveConfig);
            this.MainContainer.Panel1.Controls.Add(this.tabContainer);
            this.MainContainer.Panel1.Padding = new System.Windows.Forms.Padding(3, 3, 3, 0);
            // 
            // MainContainer.Panel2
            // 
            this.MainContainer.Panel2.Controls.Add(this.gvWebResults);
            this.MainContainer.Panel2.Padding = new System.Windows.Forms.Padding(3, 0, 3, 3);
            this.MainContainer.Size = new System.Drawing.Size(604, 272);
            this.MainContainer.SplitterDistance = 117;
            this.MainContainer.TabIndex = 1;
            // 
            // lnkLoadConfig
            // 
            this.lnkLoadConfig.ActiveLinkColor = System.Drawing.Color.Blue;
            this.lnkLoadConfig.AutoSize = true;
            this.lnkLoadConfig.LinkColor = System.Drawing.Color.Black;
            this.lnkLoadConfig.Location = new System.Drawing.Point(468, 6);
            this.lnkLoadConfig.Name = "lnkLoadConfig";
            this.lnkLoadConfig.Size = new System.Drawing.Size(64, 13);
            this.lnkLoadConfig.TabIndex = 50;
            this.lnkLoadConfig.TabStop = true;
            this.lnkLoadConfig.Text = "Load Config";
            this.lnkLoadConfig.LinkClicked += new System.Windows.Forms.LinkLabelLinkClickedEventHandler(this.linkLabel2_LinkClicked);
            // 
            // lnkSaveConfig
            // 
            this.lnkSaveConfig.ActiveLinkColor = System.Drawing.Color.Blue;
            this.lnkSaveConfig.AutoSize = true;
            this.lnkSaveConfig.LinkColor = System.Drawing.Color.Black;
            this.lnkSaveConfig.Location = new System.Drawing.Point(536, 6);
            this.lnkSaveConfig.Name = "lnkSaveConfig";
            this.lnkSaveConfig.Size = new System.Drawing.Size(65, 13);
            this.lnkSaveConfig.TabIndex = 49;
            this.lnkSaveConfig.TabStop = true;
            this.lnkSaveConfig.Text = "Save Config";
            this.lnkSaveConfig.LinkClicked += new System.Windows.Forms.LinkLabelLinkClickedEventHandler(this.linkLabel1_LinkClicked);
            // 
            // gvWebResults
            // 
            this.gvWebResults.AllowUserToAddRows = false;
            this.gvWebResults.AllowUserToDeleteRows = false;
            this.gvWebResults.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.Fill;
            this.gvWebResults.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.colWebServerDesc,
            this.colWebVersion,
            this.colWebHitCount});
            this.gvWebResults.Dock = System.Windows.Forms.DockStyle.Fill;
            this.gvWebResults.Location = new System.Drawing.Point(3, 0);
            this.gvWebResults.MultiSelect = false;
            this.gvWebResults.Name = "gvWebResults";
            this.gvWebResults.ReadOnly = true;
            this.gvWebResults.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.gvWebResults.Size = new System.Drawing.Size(598, 148);
            this.gvWebResults.TabIndex = 0;
            // 
            // colWebServerDesc
            // 
            this.colWebServerDesc.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
            this.colWebServerDesc.DataPropertyName = "Description";
            this.colWebServerDesc.HeaderText = "Server Description";
            this.colWebServerDesc.Name = "colWebServerDesc";
            this.colWebServerDesc.ReadOnly = true;
            // 
            // colWebVersion
            // 
            this.colWebVersion.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.DisplayedCells;
            this.colWebVersion.DataPropertyName = "Type";
            this.colWebVersion.HeaderText = "Type";
            this.colWebVersion.Name = "colWebVersion";
            this.colWebVersion.ReadOnly = true;
            this.colWebVersion.Width = 56;
            // 
            // colWebHitCount
            // 
            this.colWebHitCount.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.DisplayedCells;
            this.colWebHitCount.DataPropertyName = "Count";
            this.colWebHitCount.HeaderText = "Hit Count";
            this.colWebHitCount.Name = "colWebHitCount";
            this.colWebHitCount.ReadOnly = true;
            this.colWebHitCount.Width = 76;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(604, 272);
            this.Controls.Add(this.MainContainer);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.SizableToolWindow;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "MainForm";
            this.Text = "Web Farm Load Tester";
            this.tabContainer.ResumeLayout(false);
            this.tabWebPages.ResumeLayout(false);
            this.tabWebPages.PerformLayout();
            this.tabResults.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.chartAverages)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chartResults)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.chartSpread)).EndInit();
            this.MainContainer.Panel1.ResumeLayout(false);
            this.MainContainer.Panel1.PerformLayout();
            this.MainContainer.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.MainContainer)).EndInit();
            this.MainContainer.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.gvWebResults)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TabControl tabContainer;
        private System.Windows.Forms.TabPage tabPage2;
        private System.Windows.Forms.TabPage tabWebPages;
        private System.Windows.Forms.SplitContainer MainContainer;
        private System.Windows.Forms.DataGridView gvWebResults;
        private System.Windows.Forms.CheckBox chkKeepOpen;
        private System.Windows.Forms.TextBox txtDelay;
        private System.Windows.Forms.Label lblDelay;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.ComboBox txtTrackerType;
        private System.Windows.Forms.Button btnCookies;
        private System.Windows.Forms.Button btnHeaders;
        private System.Windows.Forms.TextBox txtWebRegExGroup;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox txtWebConnections;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Button btnWebTest;
        private System.Windows.Forms.TextBox txtWebRegex;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtWebUrl;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.DataGridViewTextBoxColumn colWebServerDesc;
        private System.Windows.Forms.DataGridViewTextBoxColumn colWebVersion;
        private System.Windows.Forms.DataGridViewTextBoxColumn colWebHitCount;
        private System.Windows.Forms.LinkLabel lnkLoadConfig;
        private System.Windows.Forms.LinkLabel lnkSaveConfig;
        private System.Windows.Forms.TabPage tabResults;
        private System.Windows.Forms.PictureBox chartSpread;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.PictureBox chartAverages;
        private System.Windows.Forms.PictureBox chartResults;

    }
}

