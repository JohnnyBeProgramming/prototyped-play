using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Web_Farm_Load_Tester.Utils;

namespace Web_Farm_Load_Tester.Dialogs
{
    public partial class ManageDictionaryDialog : Form
    {
        public string WindowTitle { get { return Text; } set { Text = value; } }
        public SerializableDictionary<string, string> CurrentValues { get; set; }

        public class ItemRow
        {
            public string Key { get; set; }
            public string Value { get; set; }

            public ItemRow() { }
            public ItemRow(string key, string value)
            {
                Key = key;
                Value = value;
            }
        }

        public ManageDictionaryDialog()
        {
            InitializeComponent();

            Load += (s, e) =>
            {
                // Bind the data list
                var data = CurrentValues.Select(itm => new ItemRow(itm.Key, itm.Value)).ToList();
                var bind = new BindingList<ItemRow>(data);
                var source = new BindingSource(bind, null);

                gvData.AllowUserToAddRows = true;
                gvData.EditMode = DataGridViewEditMode.EditOnKeystrokeOrF2;
                gvData.AutoGenerateColumns = false;
                gvData.DataSource = source;

                RefreshData();
            };
        }

        private void RefreshData()
        {
            var data = gvData.DataSource;
            gvData.DataSource = null;
            gvData.DataSource = data;
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            var source = gvData.DataSource as BindingSource;
            if (source != null)
            {
                CurrentValues.Clear();
                foreach (var item in source.DataSource as BindingList<ItemRow>)
                {
                    if (!string.IsNullOrEmpty(item.Key))
                    {
                        CurrentValues[item.Key] = item.Value;
                    }
                }
            }
            DialogResult = System.Windows.Forms.DialogResult.OK;
        }

    }
}
