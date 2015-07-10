using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Web_Farm_Load_Tester.Models
{
    public class RequestState
    {
        public WebRequest Request { get; internal set; }
        public WebResponse Response { get; internal set; }
        public DateTime TimerStarted { get; set; }
        public DateTime TimerStopped { get; set; }

        public Action<ResponseState> RequestCallback { get; set; }
        public Action<Exception> RequestOnError { get; set; }

        public Stream ResponseStream { get; internal set; }
        public StringBuilder RequestData { get; internal set; }

        public int BufferSize { get; internal set; }
        public byte[] BufferRead { get; internal set; }

        // Create Decoder for appropriate enconding type.
        public readonly Decoder StreamDecode = Encoding.UTF8.GetDecoder();

        public RequestState()
        {
            BufferSize = 1024;
            BufferRead = new byte[BufferSize];
            RequestData = new StringBuilder(String.Empty);
            Request = null;
            ResponseStream = null;
        }
    }

    public static class RequestStateExtender
    {
        public static void SetCookies(this WebRequest response, CookieContainer cookies)
        {
            var httpRequest = response as HttpWebRequest;
            if (httpRequest != null && httpRequest.CookieContainer == null)
            {
                httpRequest.CookieContainer = cookies;
            }
        }

        public static CookieCollection GetCookies(this WebRequest response)
        {
            var httpRequest = response as HttpWebRequest;
            if (httpRequest != null && httpRequest.CookieContainer == null)
            {
                httpRequest.CookieContainer = new CookieContainer();
            }
            return (httpRequest != null) ? httpRequest.CookieContainer.GetCookies(response.RequestUri) : null;
        }

        public static CookieCollection GetCookies(this WebResponse response)
        {
            var httpResponse = response as HttpWebResponse;
            return (httpResponse != null) ? httpResponse.Cookies : null;
        }

        public static long ItemKey(this RequestState state)
        {
            if (state != null && state.TimerStarted != null)
            {
                return (long)(DateTime.Now - state.TimerStarted).TotalSeconds;
            }
            return 0;
        }
    }
}
