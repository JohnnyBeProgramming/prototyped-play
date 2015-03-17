using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web_Farm_Load_Tester.Models
{
    public class ResponseCounter
    {
        public string Description { get; set; }
        public string Type { get; set; }
        public long Count { get; set; }
        
        internal Exception LastError { get; set; }        
    }
}
