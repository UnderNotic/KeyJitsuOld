using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using KeyJitsu.Server.Models;
using KeyJitsu.Server.Providers;
using KeyJitsu.Server.Services;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Schema;

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
        public bool GetSingleShortcutAnswer(JObject jsonData)
        {
            dynamic json = jsonData;
            try
            {
                return _shortcutDataProvider.ShortcutSheets.First(sheet => sheet.Editor == json.editor)
                    .Categories.SelectMany(pair => pair.Value)
                    .First(shortcut => shortcut.Name == json.name)
                    .Keys.ToUpper() == json.hotkey.ToUpper();
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
