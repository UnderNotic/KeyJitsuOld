using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using KeyJitsu.Server.Models;
using KeyJitsu.Server.Providers;
using KeyJitsu.Server.Services;

namespace KeyJitsu.Server.Controllers
{
    public class ShortcutsController : ApiController
    {
        private readonly IShortcutDataProvider _shortcutDataProvider;
        private readonly IRandomShortcutPicker _randomShortcutPicker;

        public ShortcutsController(IShortcutDataProvider shortcutDataProvider, IRandomShortcutPicker randomShortcutPicker)
        {
            _shortcutDataProvider = shortcutDataProvider;
            _randomShortcutPicker = randomShortcutPicker;
        }

        public Shortcut GetSingleShortcut([FromUri] string editor, [FromUri] string[] categories)
        {
            return _randomShortcutPicker.GetRandomShortcutBasedOnPriorities(GetAllShortcuts(editor, categories).ToList());
        }

        public string GetSingleShortcutQuestion([FromUri] string editor, [FromUri] string[] categories)
        {
            return _randomShortcutPicker.GetRandomShortcutBasedOnPriorities(GetAllShortcuts(editor, categories).ToList()).Name;
        }

        public bool GetSingleShortcutAnswer([FromUri] string editor, [FromUri] string name, [FromUri] string hotkey)
        {
            try
            {
                return _shortcutDataProvider.ShortcutSheets.First(sheet => sheet.Editor == editor)
                    .Categories.SelectMany(pair => pair.Value)
                    .First(shortcut => shortcut.Name == name)
                    .Keys == hotkey;
            }
            catch
            {
                return false;
            }                
        }

        public IEnumerable<Shortcut> GetAllShortcuts([FromUri] string editor, [FromUri] string[] categories)
        {
            return _shortcutDataProvider.ShortcutSheets.First(sheet => sheet.Editor == editor)
                 .Categories.Where(category => categories.Contains(category.Key)).SelectMany(category => category.Value);
        }
    }
}
