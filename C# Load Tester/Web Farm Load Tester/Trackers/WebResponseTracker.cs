using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Web_Farm_Load_Tester.Models;

namespace Web_Farm_Load_Tester.Trackers
{
    public class WebResponseTracker : RequestTracker
    {
        const int BUFFER_SIZE = 1024;

        internal class Counters
        {
            public long TimerSecond { get; set; }
            public long RequestsSent { get; set; }
            public long ResponsesReceived { get; set; }
            public long AverageTimeMs { get; set; }
            public long ConnectionErrors { get; set; }
            public long RuntimeErrors { get; set; }
            public long ConnectionClosed { get; set; }
        }
        internal Dictionary<long, Counters> TimedCounters { get; set; }

        protected long CurrentAverage { get; set; }
        protected CookieContainer PersistedCookies { get; set; }
        protected WebHeaderCollection PersistedHeaders { get; set; }

        internal Counters this[long seconds]
        {
            get
            {
                if (!TimedCounters.ContainsKey(seconds))
                {
                    var counters = TimedCounters[seconds] = new Counters { TimerSecond = seconds };
                    return counters;
                }
                return TimedCounters[seconds];
            }

        }

        public WebResponseTracker()
        {
            TimedCounters = new Dictionary<long, Counters>();
        }

        public override RequestState DefineRequest(string httpWebUrl)
        {
            WebUrl = httpWebUrl;

            // Populate intial list of cookies
            var cookies = PersistedCookies = new CookieContainer();
            foreach (var itm in Cookies)
            {
                var cookie = new Cookie(itm.Key, itm.Value);
                cookies.Add(new Uri(WebUrl), cookie);
            }

            // Populate the headers with the initial values
            var headers = PersistedHeaders = new WebHeaderCollection();
            foreach (var itm in Headers)
            {
                headers.Add(itm.Key, itm.Value);
            }

            // Create the request and state objects
            var state = new RequestState { };

            return state;
        }

        public override IAsyncResult SendRequestAsync(RequestState state, Action<ResponseState> callback = null, Action<Exception> onError = null)
        {
            try
            {
                // Create a new request object (and set persisted state)
                var req = state.Request = WebRequest.Create(WebUrl);
                if (req is HttpWebRequest)
                {
                    // Persist cookies and headers
                    req.SetCookies(PersistedCookies);
                    req.Headers = PersistedHeaders;
                }

                // Define error handler                
                Action<Exception> exHandler = (ex) =>
                {
                    var i = state.ItemKey();
                    this[i].ConnectionErrors++;
                    if (onError != null) onError(ex);
                };

                // Update response handlers
                state.Response = null;
                state.ResponseStream = null;
                state.RequestData = new StringBuilder();
                state.RequestCallback = callback;
                state.RequestOnError = exHandler;
                state.TimerStarted = DateTime.Now;

                // Send async request
                var key = state.ItemKey();
                var wreq = state.Request;
                var handler = new AsyncCallback(RespCallback);
                this[key].RequestsSent++;
                return (IAsyncResult)wreq.BeginGetResponse(handler, state);
            }
            catch (Exception ex)
            {
                // The respponse could not be parsed
                if (state != null && state.RequestOnError != null)
                {
                    state.RequestOnError(ex);
                }
            }
            return null;
        }

        private void RespCallback(IAsyncResult ar)
        {
            RequestState state = null;
            try
            {
                // Get the RequestState object from the async result.
                state = (RequestState)ar.AsyncState;
                state.TimerStopped = DateTime.Now;

                var key = state.ItemKey();
                this[key].ResponsesReceived++;

                // Get the WebRequest from RequestState.
                var req = state.Request;

                // Call EndGetResponse, which produces the WebResponse object
                //  that came from the request issued above.
                var resp = state.Response = req.EndGetResponse(ar);
                if (resp.Headers != null)
                {
                    // Update the headers with what was returned
                    //PersistedHeaders = resp.Headers;
                    //PersistedHeaders.Remove("Set-Cookie");
                }

                //  Start reading data from the response stream.
                var stream = state.ResponseStream = resp.GetResponseStream();

                //  Pass rs.BufferRead to BeginRead. Read data into rs.BufferRead
                var readCallback = new AsyncCallback(ReadCallBack);
                var iarRead = stream.BeginRead(state.BufferRead, 0, BUFFER_SIZE, readCallback, state);
            }
            catch (Exception ex)
            {
                // The respponse could not be parsed
                if (state != null && state.RequestOnError != null)
                {
                    state.RequestOnError(ex);

                    var key = state.ItemKey();
                    this[key].RuntimeErrors++;
                }
            }
            finally
            {
                if (state != null)
                {
                    var key = state.ItemKey();
                    var dur = (long)(state.TimerStopped - state.TimerStarted).TotalMilliseconds;
                    var avg = this[key].AverageTimeMs = (CurrentAverage + dur) / 2;
                    CurrentAverage = avg;
                }
            }
        }

        private void ReadCallBack(IAsyncResult asyncResult)
        {
            // Get the RequestState object from AsyncResult.
            var state = (RequestState)asyncResult.AsyncState;
            try
            {
                // Retrieve the ResponseStream that was set in RespCallback. 
                var responseStream = state.ResponseStream;

                // Read rs.BufferRead to verify that it contains data. 
                var read = responseStream.EndRead(asyncResult);
                if (read > 0)
                {
                    // Prepare a Char array buffer for converting to Unicode.
                    var charBuffer = new Char[BUFFER_SIZE];

                    // Convert byte stream to Char array and then to String.
                    // len contains the number of characters converted to Unicode.
                    var len = state.StreamDecode.GetChars(state.BufferRead, 0, read, charBuffer, 0);
                    var str = new String(charBuffer, 0, len);

                    // Append the recently read data to the RequestData stringbuilder
                    // object contained in RequestState.
                    state.RequestData.Append(Encoding.ASCII.GetString(state.BufferRead, 0, read));

                    // Continue reading data until 
                    // responseStream.EndRead returns –1.
                    var ar = responseStream.BeginRead(state.BufferRead, 0, BUFFER_SIZE, new AsyncCallback(ReadCallBack), state);
                }
                else
                {
                    //  The response is parsed, update state
                    var strContent = state.RequestData.ToString();
                    var strIdent = "Unmatched Response";
                    var strType = "Response";
                    switch (MatchType)
                    {
                        case "Response Text": strIdent = MatchResponseBody(strContent); break;
                        case "HTTP Headers": strIdent = MatchResponseHeader(state.Response.Headers); break;
                        case "HTTP Cookies": strIdent = MatchResponseCookie(PersistedCookies.GetCookies(state.Response.ResponseUri)); break;
                        default: strIdent = "Unknown Tracker: " + MatchType; break;
                    }

                    // Define result state object
                    var resp = new ResponseState(strIdent, strContent, strType);
                    if (state.RequestCallback != null)
                    {
                        state.RequestCallback(resp);
                    }

                    // Close down the response stream.
                    responseStream.Close();

                    var key = state.ItemKey();
                    this[key].ConnectionClosed++;
                }
            }
            catch (Exception ex)
            {
                // Define result state object
                var resp = new ResponseState(ex.Message, null, string.Empty);
                if (state.RequestCallback != null)
                {
                    state.RequestCallback(resp);

                    var key = state.ItemKey();
                    this[key].RuntimeErrors++;
                }
            }
        }

        private string MatchResponseBody(string strContent)
        {
            var strRegEx = new Regex(MatchExpression, RegexOptions.Singleline);
            var strMatch = strRegEx.Match(strContent);
            if (strMatch.Success)
            {
                // Check for a regex match
                if (strMatch.Groups.Count > MatchGroupIndex)
                {
                    return strMatch.Groups[MatchGroupIndex].Value.Trim();
                }
                else
                {
                    return string.Format("RegEx: Invalid Group Index {0}, Max is {1}", MatchGroupIndex, strMatch.Groups.Count);
                }
            }
            return string.Format("RegEx: No match for '{0}'", MatchExpression);
        }

        private string MatchResponseHeader(WebHeaderCollection headers)
        {
            var strRegEx = new Regex(MatchExpression, RegexOptions.Singleline);
            foreach (var ident in headers.AllKeys)
            {
                var strMatch = strRegEx.Match(ident);
                if (strMatch.Success)
                {
                    // Return the header value as the result
                    return headers[ident];
                }
            }
            return string.Format("Header not found: '{0}'", MatchExpression);
        }

        private string MatchResponseCookie(CookieCollection cookies)
        {
            var strRegEx = new Regex(MatchExpression, RegexOptions.Singleline);
            foreach (Cookie cookie in cookies)
            {
                var strMatch = strRegEx.Match(cookie.Name);
                if (strMatch.Success)
                {
                    // Return the header value as the result
                    return cookie.Value;
                }
            }
            return string.Format("Cookie not found: '{0}'", MatchExpression);
        }
    }
}
