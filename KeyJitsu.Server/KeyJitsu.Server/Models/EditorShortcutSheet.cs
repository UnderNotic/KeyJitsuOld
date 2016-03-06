using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace KeyJitsu.Server.Models
{
    public class EditorShortcutSheet
    {
        public string Editor { get; }
        public ReadOnlyDictionary<string, IReadOnlyList<Shortcut>> Categories { get; }

        public EditorShortcutSheet(string editor, ReadOnlyDictionary<string, IReadOnlyList<Shortcut>> categories)
        {
            Editor = editor;
            Categories = categories;
        }
    }
}