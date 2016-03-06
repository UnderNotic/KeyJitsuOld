using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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


        public IEnumerable<Shortcut> GetAllShortcuts([FromUri] string editor, [FromUri] string[] categories)
        {
            return _shortcutDataProvider.ShortcutSheets.First(sheet => sheet.Editor == editor)
                 .Categories.Where(category => categories.Contains(category.Key)).SelectMany(category => category.Value);
        }
    }
}
