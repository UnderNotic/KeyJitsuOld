using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using KeyJitsu.Server.Models;
using KeyJitsu.Server.Providers;
using KeyJitsu.Server.Services;
using Newtonsoft.Json.Linq;

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

        public Shortcut GetSingleShortcut([FromUri] string editor, [FromUri] IEnumerable<string> categories)
        {
            return _randomShortcutPicker.GetRandomShortcutBasedOnPriorities(GetAllShortcuts(editor, categories).ToList());
        }

        public string GetSingleShortcutQuestion([FromUri] string editor, [FromUri] IEnumerable<string> categories)
        {
            try
            {
                return
                    _randomShortcutPicker.GetRandomShortcutBasedOnPriorities(
                        GetAllShortcuts(editor, categories).ToList()).Name;
            }
            catch
            {
                return "Chosen category doesn't exist";
            }
        }

        [HttpPost]
        public bool GetSingleShortcutAnswer([FromBody] JObject jsonData)
        {
            dynamic json = jsonData;

            var editor = (string)json.editor;
            var name = (string)json.name;
            var hotkey = (string)json.hotkey;
          
            try
            {
                return string.Equals(_shortcutDataProvider.ShortcutSheets.First(sheet => sheet.Editor == editor)
                    .Categories.SelectMany(pair => pair.Value)
                    .First(shortcut => shortcut.Name == name)
                    .Keys, hotkey, StringComparison.CurrentCultureIgnoreCase);
            }
            catch
            {
                return false;
            }                
        }

        public IList<string> GetAllCategories([FromUri] string editor)
        {
            return
                _shortcutDataProvider.ShortcutSheets.First(sheet => sheet.Editor == editor)
                    .Categories.Select(category => category.Key).ToList();
        } 

        public IList<Shortcut> GetAllShortcuts([FromUri] string editor, [FromUri] IEnumerable<string> categories)
        {
            return _shortcutDataProvider.ShortcutSheets.First(sheet => sheet.Editor == editor)
                 .Categories.Where(category => categories.Contains(category.Key)).SelectMany(category => category.Value).ToList();
        }
    }
}
