using System.Linq;
using KeyJitsu.Server.Models;

namespace KeyJitsu.Server.Filters
{
    public class ShortcutsForChromeFilter : IFilter<Shortcut>, IFilter
    {
        private readonly string[] DISABLED_KEYS = {"CTRL+T", "CTRL+N", "CTRL+W"};

        public bool FilterPredicate(Shortcut t)
        {
            return DISABLED_KEYS.All(disKey => disKey != t.Keys.Replace(" ", string.Empty));
        }
    }
}