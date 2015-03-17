using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web_Farm_Load_Tester.Trackers;

namespace Web_Farm_Load_Tester.Models
{
    [Serializable]
    public class ProfileConfig
    {
        public RequestTracker Tracker { get; set; }
    }
}
