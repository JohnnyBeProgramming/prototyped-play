using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web_Farm_Load_Tester.Models
{
    public class ResponseState
    {
        public string ResponseDesc { get; set; }
        public string ResponseType { get; set; }
        public string ResponseText { get; set; }

        public ResponseState(string desc, string data = null, string typeDesc = null)
        {
            ResponseDesc = desc;
            ResponseType = typeDesc;
            ResponseText = data;
        }
    }
}
