using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace KeyJitsu.Server.Models
{
    public class EditorShortcutSheet
    {
        public string Editor { get; }
        public ReadOnlyDictionary<string, ReadOnlyDictionary<string, string>> Categories { get; }

        public EditorShortcutSheet(string editor, ReadOnlyDictionary<string, ReadOnlyDictionary<string, string>> categories)
        {
            Editor = editor;
            Categories = categories;
        }
    }
}