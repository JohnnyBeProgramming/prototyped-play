using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using Web_Farm_Load_Tester.Dialogs;
using Web_Farm_Load_Tester.Models;
using Web_Farm_Load_Tester.Trackers;
using Web_Farm_Load_Tester.Utils;

namespace Web_Farm_Load_Tester
{
    public partial class MainForm : Form
    {
        public ManualResetEvent AllDone = new ManualResetEvent(false);
        public Dictionary<RequestState, ResponseState> WebRequestTrackers { get; private set; }
        public Dictionary<string, ResponseCounter> WebResponseCounters { get; private set; }

        public SerializableDictionary<string, string> Cookies { get; set; }
        public SerializableDictionary<string, string> Headers { get; set; }

        public event EventHandler<EventArgs> OnWaitCompleted;

        private bool _isBusy = false;
        private bool _hasChanges = false;
        private bool _keepAlive = false;
        private object _lockObj = new object();
        private RequestTracker _tracker = null;
        private System.Timers.Timer _timer;

        public MainForm()
        {
            InitializeComponent();
            SetEnablement(false);

            Load += (s, e) =>
            {
                _tracker = GetTracker();

                if (tabContainer.TabPages.Contains(tabResults))
                {
                    tabContainer.TabPages.Remove(tabResults);
                }

                SetEnablement(true);
            };
            FormClosing += (s, e) =>
            {
                _isBusy = false;
                AllDone.Set();
            };

            // Create Tracker and Counter Lists
            Headers = new SerializableDictionary<string, string>();
            Cookies = new SerializableDictionary<string, string>();
            WebRequestTrackers = new Dictionary<RequestState, ResponseState>();
            WebResponseCounters = new Dictionary<string, ResponseCounter>();

            // Define and override any additional app settings
            PeekSetting("DefaultUrl", (val) => txtWebUrl.Text = val);
            PeekSetting("DefaultMax", (val) => txtWebConnections.Text = val);
        }

        private bool PeekSetting(string ident, Action<string> onValue = null)
        {
            var appSetting = ConfigurationManager.AppSettings[ident];
            if (appSetting != null && onValue != null) onValue(appSetting);
            return appSetting != null;
        }

        private SerializableDictionary<string, string> ParseParams(string keyValuePairs)
        {
            var results = new SerializableDictionary<string, string>();
            if (!string.IsNullOrEmpty(keyValuePairs))
            {
                foreach (var itm in keyValuePairs.Split(';'))
                {
                    if (!string.IsNullOrEmpty(itm))
                    {
                        var parts = itm.Split('=');
                        if (parts.Length > 1)
                        {
                            var key = parts[0].Trim();
                            var val = parts[1].Trim();
                            if (!string.IsNullOrEmpty(key))
                            {
                                results[key] = val;
                            }
                        }
                    }
                }
            }
            return results;
        }

        private void SetEnablement(bool enabled)
        {
            txtWebUrl.Enabled = enabled;
            txtTrackerType.Enabled = enabled;
            txtWebRegex.Enabled = enabled;
            txtWebRegExGroup.Enabled = enabled;
            txtWebConnections.Enabled = enabled;
            txtDelay.Enabled = enabled && chkKeepOpen.Checked;
            lblDelay.Enabled = enabled && chkKeepOpen.Checked;
            chkKeepOpen.Enabled = enabled;
            btnCookies.Enabled = enabled;
            btnHeaders.Enabled = enabled;
            lnkLoadConfig.Enabled = enabled;
            lnkSaveConfig.Enabled = enabled && _tracker != null;
            btnWebTest.Text = _isBusy ? "Stop Load Tester" : "Load Test Servers";
            gvWebResults.Enabled = enabled;

            Refresh();
        }

        private void LoadProfile(ProfileConfig data)
        {
            try
            {
                SetEnablement(false);

                _tracker = data.Tracker;
                if (_tracker != null)
                {
                    // Load all the tracker data into the UI
                    var trackerDesc = string.Empty;
                    var trackerIndex = (txtTrackerType.Items.Count > 0) ? 0 : -1;
                    for (var i = 0; i < txtTrackerType.Items.Count; i++)
                    {
                        var key = txtTrackerType.Items[i] as string;
                        if (key == _tracker.MatchType)
                        {
                            trackerDesc = key;
                            trackerIndex = i;
                        }
                    }

                    Headers = _tracker.Headers;
                    Cookies = _tracker.Cookies;
                    WebResponseCounters.Clear();
                    WebRequestTrackers.Clear();

                    txtWebUrl.Text = _tracker.WebUrl;
                    txtTrackerType.SelectedIndex = trackerIndex;
                    txtWebRegex.Text = _tracker.MatchExpression;
                    txtWebRegExGroup.Text = _tracker.MatchGroupIndex.ToString();
                    txtWebConnections.Text = _tracker.MaxCount.ToString();
                    txtDelay.Text = _tracker.DelayTime.ToString();
                    chkKeepOpen.Checked = _tracker.KeepAllive;
                }

                // Set the web pages tab
                tabContainer.SelectedTab = tabWebPages;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                SetEnablement(true);
                RefreshData();
            }
        }

        private RequestTracker GetTracker()
        {
            var url = txtWebUrl.Text;
            var cookies = Cookies;
            var headers = Headers;
            var trackerType = string.Empty;
            if (txtTrackerType.SelectedIndex > -1)
            {
                trackerType = txtTrackerType.Items[txtTrackerType.SelectedIndex].ToString();
            }
            else if (txtTrackerType.Items.Count > 0)
            {
                trackerType = txtTrackerType.Items[0].ToString();
            }

            var i = 0;
            var maxCount = int.TryParse(txtWebConnections.Text, out i) ? i : 1;
            var delayTime = int.TryParse(txtDelay.Text, out i) ? i : 0;
            var groupIndex = int.TryParse(txtWebRegExGroup.Text, out i) ? i : 0;
            return new WebResponseTracker
            {
                WebUrl = url,
                Headers = headers,
                Cookies = cookies,
                MaxCount = maxCount,
                KeepAllive = chkKeepOpen.Checked,
                DelayTime = delayTime,
                MatchType = trackerType,
                MatchExpression = txtWebRegex.Text,
                MatchGroupIndex = groupIndex,
            };
        }

        private ProfileConfig GetCurrentProfile()
        {
            var data = new ProfileConfig
            {
                Tracker = GetTracker(),
            };

            return data;
        }

        private void StartLoadTesting(string webUrl, RequestTracker tracker, int maxLimit)
        {
            // Clear and reset results
            WebResponseCounters.Clear();
            WebRequestTrackers.Clear();
            RefreshCounters();

            if (tabContainer.SelectedTab == tabResults)
            {
                tabContainer.SelectedIndex = 0;
            }
            tabContainer.TabPages.Remove(tabResults);

            // Call the web request [n] times
            for (var i = 0; i < maxLimit; i++)
            {
                // Create the request state object
                var req = tracker.DefineRequest(webUrl);

                // Set the keep alive params
                tracker.KeepAllive = _keepAlive = chkKeepOpen.Checked;
                tracker.DelayTime = int.Parse(txtDelay.Text);

                // Add request to tracker list (no response)
                WebRequestTrackers[req] = null;

                // Issue the async request.                
                tracker.SendRequestAsync(req, (response) => TrackerResponse(tracker, req, response), (ex) => TrackerError(req, ex));
            }

            // Update UI
            RefreshCounters();
        }

        private void TrackerResponse(RequestTracker tracker, RequestState req, ResponseState response)
        {
            // Add result to counters
            AddResult(response.ResponseDesc, response.ResponseType);

            // Check if the request channel should stay open
            if (tracker.KeepAllive && _isBusy)
            {
                WebRequestTrackers[req] = response;

                // Let the tread sleep for a while and then re-issue statement
                var bw = new BackgroundWorker
                {
                    WorkerSupportsCancellation = true,
                };

                // Hook events
                bw.DoWork += (s, e) =>
                {
                    // Set the delay timer (if defined)
                    if (tracker.DelayTime > 0) Thread.Sleep(tracker.DelayTime);

                    // Check if there is a pending cancellation
                    if (bw.CancellationPending && WebRequestTrackers.ContainsKey(req))
                    {
                        WebRequestTrackers.Remove(req);
                        return;
                    }

                    if (_isBusy && chkKeepOpen.Checked)
                    {
                        // Re-issue the async request.    
                        WebRequestTrackers[req] = null;
                        tracker.SendRequestAsync(req, (resp) => TrackerResponse(tracker, req, resp), (ex) => TrackerError(req, ex));
                    }
                    else if (WebRequestTrackers.ContainsKey(req))
                    {
                        WebRequestTrackers.Remove(req);
                        return;
                    }
                };
                bw.RunWorkerCompleted += (s, e) =>
                {
                    bw.Dispose();
                };
                bw.RunWorkerAsync();

                // Hook event when closing to stop background thread
                OnWaitCompleted += (snd, evt) =>
                {
                    if (!bw.IsBusy) bw.CancelAsync();
                };
            }
            else if (WebRequestTrackers.ContainsKey(req))
            {
                // Remove tracker from list
                WebRequestTrackers.Remove(req);
            }
        }

        private void TrackerError(RequestState req, Exception ex)
        {
            // An error occured while sending the request
            AddResult(ex, "Exception");

            if (WebRequestTrackers.ContainsKey(req))
            {
                WebRequestTrackers.Remove(req);
            }
        }

        private void AddResult(Exception error, string type = null)
        {
            AddResult(error.Message, type, error);
        }
        private void AddResult(string ident, string typeDesc, Exception error = null)
        {
            // Ignore lagging responses after load tester was stopped
            if (!_isBusy) return;

            // Now we update the result set
            lock (_lockObj)
            {
                // Add the counter to the results list
                var counter = (ResponseCounter)null;
                if (!WebResponseCounters.ContainsKey(ident))
                {
                    WebResponseCounters[ident] = counter = new ResponseCounter
                    {
                        Description = ident,
                        Type = typeDesc,
                    };
                }
                else
                {
                    counter = WebResponseCounters[ident];
                }
                if (error != null)
                {
                    counter.LastError = error;
                }
                counter.Count++;
            }

            // Update the UI
            if (!IsDisposed) Invoke((Action)RefreshCounters);
        }

        private void RefreshCounters()
        {
            if (_timer != null && _timer.Enabled)
            {
                _hasChanges = true;
            }
        }

        private void RefreshData()
        {
            var data = new BindingSource { DataSource = WebResponseCounters.Values };

            gvWebResults.SuspendLayout();
            gvWebResults.DataSource = null;
            gvWebResults.DataSource = data;
            gvWebResults.AutoResizeColumns(DataGridViewAutoSizeColumnsMode.AllCells);
            gvWebResults.Refresh();
            gvWebResults.ResumeLayout();

            CheckIfDone();
        }

        private void CheckIfDone()
        {
            // Set the ManualResetEvent so the main thread can exit.
            var reqCount = WebRequestTrackers.Count;
            var reqBusy = (reqCount > 0) || _keepAlive;
            if (!reqBusy || !_isBusy)
            {
                // Reset the thread wait                
                AllDone.Set();
            }
        }

        private void OnCompleted()
        {
            try
            {
                // Set the web pages tab
                tabContainer.TabPages.Add(tabResults);
                tabContainer.SelectedTab = tabResults;

                // Clear prev results and charts
                var urlTimesspan = string.Empty;
                var urlAverages = string.Empty;
                var urlLoadShare = string.Empty;

                chartSpread.Visible = false;
                chartResults.Visible = false;
                chartAverages.Visible = false;

                var worker = new BackgroundWorker();
                worker.DoWork += (s, e) =>
                {
                    // Load  the chart data
                    var listData = WebResponseCounters.Values.ToList();
                    var urlLoad = urlLoadShare = GenerateReportLoadShare(listData);
                    if (!string.IsNullOrEmpty(urlLoadShare))
                    {
                        chartSpread.Invoke((Action<PictureBox, string>)UpdateChartImage, chartSpread, urlLoadShare);
                    }

                    // Display timespan data (if defined)
                    var tracker = _tracker as WebResponseTracker;
                    if (tracker != null)
                    {
                        var timeData = tracker.TimedCounters.Values.OrderBy(itm => itm != null ? itm.TimerSecond : 0).ToList();

                        urlTimesspan = GenerateReportTimespan(timeData);                        
                        chartResults.Invoke((Action<PictureBox, string>)UpdateChartImage, chartResults, urlTimesspan);

                        urlAverages = GenerateReportAverages(timeData);
                        chartAverages.Invoke((Action<PictureBox, string>)UpdateChartImage, chartAverages, urlAverages);
                    }
                };
                worker.RunWorkerAsync();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                SetEnablement(true);
            }
        }

        private void UpdateChartImage(PictureBox chartPicture, string urlImage)
        {
            // Add larger version to the image (as clickable)
            chartPicture.Tag = new Regex(@"chs=(\d+)x(\d+)").Replace(urlImage, "chs=1000x300");
            chartPicture.Cursor = Cursors.Hand;
            chartPicture.Visible = true;
            chartPicture.Load(urlImage);            
        }

        private string GenerateReportTimespan(List<WebResponseTracker.Counters> listData)
        {
            var template = "https://chart.googleapis.com/chart?chs={0}&chd={1}&cht={2}&chco={3}&chds={4}&chbh=a";
            // http://chart.googleapis.com/chart?cht=bvs&chs=320x200&chd=t:1169,0,0,0,0|28,405,716,17,3|1,200,5,4,0|1,2,5,4,1000&chco=c6d9fd,4d89f9,06d90d,FF0000&chds=0,1500&chbh=a
            // Generate data points for load shared
            var times = listData.Select(itm => itm.TimerSecond);
            var sends = listData.Select(itm => itm.RequestsSent);
            var recvs = listData.Select(itm => itm.ResponsesReceived);
            var conns = listData.Select(itm => itm.ConnectionErrors);
            var error = listData.Select(itm => itm.RuntimeErrors);
            var labels = new List<string>
            {
                Uri.EscapeDataString("Requests Sent"),
                Uri.EscapeDataString("Requests Received"),
                Uri.EscapeDataString("Average Time (ms)"),
                Uri.EscapeDataString("Connection Errors"),
                Uri.EscapeDataString("Runtime Errors"),
            };

            Func<long, long, long> add = (x, y) => x + y;

            var sum = sends.Zip(recvs, add).Zip(conns, add).Zip(error, add);
            var max = sum.Any() ? sum.Max() : 100;
            var cht = "bvs"; // Chart Type
            var chs = "320x32"; // Width and Height
            var chl = string.Join("|", sends); // Chart Labels
            var chd = string.Join(",", times); // Chart Data
            var chds = string.Format("0,{0}", max);
            var chco = "c6d9fd,4d89f9,06d90d,FF0000";
            var chd_sends = string.Join(",", sends); // Chart Data
            var chd_recvs = string.Join(",", recvs); // Chart Data
            var chd_conns = string.Join(",", conns); // Chart Data
            var chd_error = string.Join(",", error); // Chart Data

            chd = string.Format("t:{0}|{1}|{2}|{3}", chd_sends, chd_recvs, chd_conns, chd_error, chds);

            return string.Format(template, chs, chd, cht, chco, chds);
        }

        private string GenerateReportAverages(List<WebResponseTracker.Counters> listData)
        {
            var template = "https://chart.googleapis.com/chart?chs={0}&chd={1}&cht={2}&chco={3}&chds={4}&chbh=a";

            // Generate data points for load shared
            var avgms = listData.Select(itm => itm.AverageTimeMs);
            var max = avgms.Any() ? avgms.Max() : 100;
            var cht = "bvs"; // Chart Type
            var chs = "320x32"; // Width and Height
            var chd = string.Join(",", avgms); // Chart Data
            var chds = string.Format("0,{0}", avgms.Max());
            var chco = "468739";

            chd = string.Format("t:{0}", chd);

            return string.Format(template, chs, chd, cht, chco, chds);
        }

        private string GenerateReportLoadShare(List<ResponseCounter> listData)
        {
            var template = "https://chart.googleapis.com/chart?chs={0}&chd={1}&cht={2}&chl={3}";

            // Generate data points for load shared
            var points = listData.Select(itm => itm.Count);
            var totals = points.Sum();
            var weight = listData.Select(itm => string.Format("{0:0.#}%", (100.0f * itm.Count) / totals));
            var labels = listData.Select(itm => Uri.EscapeDataString(itm.Description));

            var cht = "p3"; // Style ?
            var chs = "250x82"; // Width and Height
            var chd = "t:" + string.Join(",", points); // Chart Data
            var chl = string.Join("|", weight); // Chart Labels

            return string.Format(template, chs, chd, cht, chl);
        }

        private void WaitForResults()
        {
            // Disable Controls 
            if (!IsDisposed) Invoke((Action)RefreshData);
            if (!IsDisposed) Invoke((Action<bool>)SetEnablement, false);

            // Create a UI refresh timer
            _timer = new System.Timers.Timer { Interval = 500 };
            _timer.Enabled = true;
            _timer.Elapsed += (s, e) =>
            {
                if (_hasChanges && _isBusy)
                {
                    if (!IsDisposed) Invoke((Action)RefreshData);
                }
            };
            _timer.Start();

            // Reset and wait for response
            AllDone.Reset();
            AllDone.WaitOne();

            // Invoke on complted waiting event
            if (OnWaitCompleted != null)
            {
                OnWaitCompleted(this, new EventArgs());
            }

            if (_timer != null && _timer.Enabled)
            {
                _timer.Stop();
            }

            // Action has been completed (or canceled)
            _isBusy = false;
            _timer = null;

            if (!IsDisposed) Invoke((Action)OnCompleted);
        }

        private void btnWebTest_Click(object sender, EventArgs e)
        {
            // Define handler for async result
            var watcher = new Thread(WaitForResults);
            try
            {
                if (!_isBusy)
                {
                    _isBusy = true;

                    // Disable UI while busy
                    watcher.Start();

                    var trackerType = string.Empty;
                    if (txtTrackerType.SelectedIndex > -1)
                    {
                        trackerType = txtTrackerType.Items[txtTrackerType.SelectedIndex].ToString();
                    }
                    else if (txtTrackerType.Items.Count > 0)
                    {
                        trackerType = txtTrackerType.Items[0].ToString();
                    }

                    // Define parameters
                    var reqWebUrl = txtWebUrl.Text;
                    var reqCounter = int.Parse(txtWebConnections.Text);
                    var reqTracker = _tracker = GetTracker();

                    // Call the load tester with current params
                    StartLoadTesting(reqWebUrl, reqTracker, reqCounter);
                }
                else
                {
                    _isBusy = false;
                    foreach (var itm in WebRequestTrackers.ToArray())
                    {
                        if (itm.Key != null && itm.Key.Request != null)
                        {
                            itm.Key.Request.Abort();
                        }
                    }

                    // Reset the thread wait
                    AllDone.Set();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
                SetEnablement(true);
            }
        }

        private void chkKeepOpen_CheckedChanged(object sender, EventArgs e)
        {
            txtDelay.Enabled = chkKeepOpen.Checked;
            lblDelay.Enabled = chkKeepOpen.Checked;
        }

        private void linkLabel1_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            try
            {
                SetEnablement(false);

                var data = GetCurrentProfile();
                if (data != null)
                {
                    var type = _tracker.GetType();
                    var file = type.Name + ".xml";
                    using (var dialog = new OpenFileDialog { CheckFileExists = false, CheckPathExists = true, FileName = file })
                    {
                        if (dialog.ShowDialog() == System.Windows.Forms.DialogResult.OK)
                        {
                            var path = dialog.FileName;
                            var value = Serializer.SerializeObject(data);
                            File.WriteAllText(path, value);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                while (ex.InnerException != null) ex = ex.InnerException;
                MessageBox.Show(ex.Message);
            }
            finally
            {
                SetEnablement(true);
            }
        }

        private void linkLabel2_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            try
            {
                SetEnablement(false);

                using (var dialog = new OpenFileDialog { CheckFileExists = true, CheckPathExists = true })
                {
                    if (dialog.ShowDialog() == System.Windows.Forms.DialogResult.OK)
                    {
                        var path = dialog.FileName;
                        var value = File.ReadAllText(path);
                        var data = Serializer.DeserializeObject<ProfileConfig>(value);
                        LoadProfile(data);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
            finally
            {
                SetEnablement(true);
            }
        }

        private void btnCookies_Click(object sender, EventArgs e)
        {
            using (var dialog = new ManageDictionaryDialog { WindowTitle = "Edit Cookies", CurrentValues = Cookies })
            {
                var valid = dialog.ShowDialog() == System.Windows.Forms.DialogResult.OK;
                if (valid)
                {
                    Cookies = dialog.CurrentValues;
                }
            }
        }

        private void btnHeaders_Click(object sender, EventArgs e)
        {
            using (var dialog = new ManageDictionaryDialog { WindowTitle = "Edit Headers", CurrentValues = Headers })
            {
                var valid = dialog.ShowDialog() == System.Windows.Forms.DialogResult.OK;
                if (valid)
                {
                    Headers = dialog.CurrentValues;
                }
            }
        }

        private void chartImage_Click(object sender, EventArgs e)
        {
            var imgBox = sender as PictureBox;
            var imgUrl = (imgBox != null) ? (imgBox.Tag as string) : null;
            if (imgUrl != null)
            {
                System.Diagnostics.Process.Start(imgUrl);
            }
        }

    }

}
