using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using Web_Farm_Load_Tester.Models;
using Web_Farm_Load_Tester.Utils;

namespace Web_Farm_Load_Tester.Trackers
{
    [Serializable]
    [XmlInclude(typeof(RequestTracker))] 
    [XmlInclude(typeof(WebResponseTracker))] 
    public abstract class RequestTracker
    {
        public string WebUrl { get; set; }
        public int MaxCount { get; set; }
        public bool KeepAllive { get; set; }
        public int DelayTime { get; set; }

        public string MatchType { get; set; }
        public string MatchExpression { get; set; }
        public int MatchGroupIndex { get; set; }

        public SerializableDictionary<string, string> Cookies { get; set; }
        public SerializableDictionary<string, string> Headers { get; set; }

        public abstract RequestState DefineRequest(string httpWebUrl);
        public abstract IAsyncResult SendRequestAsync(RequestState state, Action<ResponseState> callback = null, Action<Exception> onError = null);
    }
}
