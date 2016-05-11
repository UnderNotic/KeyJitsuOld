using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using KeyJitsu.Server.Filters;
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
        private readonly IFilterFactory _filterFactory;

        public ShortcutsController(IShortcutDataProvider shortcutDataProvider, IRandomShortcutPicker randomShortcutPicker, IFilterFactory filterFactory)
        {
            _shortcutDataProvider = shortcutDataProvider;
            _randomShortcutPicker = randomShortcutPicker;
            _filterFactory = filterFactory;
        }

        public Shortcut GetSingleShortcut([FromUri] string editor, [FromUri] IEnumerable<string> categories)
        {
            return _randomShortcutPicker.GetRandomShortcutBasedOnPriorities(_shortcutDataProvider.GetAllShortcuts(editor, categories).ToList());
        }

        public string GetSingleShortcutQuestion([FromUri] string editor, [FromUri] IEnumerable<string> categories)
        {
            try
            {
                var allShortcuts = IsChromeAsking() ?
                    _shortcutDataProvider.GetAllShortcuts(editor, categories).Where(_filterFactory.GetFilter<ShortcutsForChromeFilter>().FilterPredicate)
                    : _shortcutDataProvider.GetAllShortcuts(editor, categories);
                return
                    _randomShortcutPicker.GetRandomShortcutBasedOnPriorities(allShortcuts.ToList()).Name;
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

        private bool IsChromeAsking()
        {
            var currentRequest = this.Request;
            return currentRequest.Headers.UserAgent.ToString().Contains("Chrome");
        }
    }
}
