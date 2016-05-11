using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web.Http;
using KeyJitsu.Server.Models;

namespace KeyJitsu.Server.Providers
{
    public interface IShortcutDataProvider
    {
        IReadOnlyList<EditorShortcutSheet> ShortcutSheets { get; }
        IList<Shortcut> GetAllShortcuts(string editor, IEnumerable<string> categories);
    }

    public class ShortcutDataProvider : IShortcutDataProvider
    {
        public IReadOnlyList<EditorShortcutSheet> ShortcutSheets { get; }

        public ShortcutDataProvider()
        {
            var visualStudioResharperSheet = new EditorShortcutSheet("VisualStudioResharper",
                new ReadOnlyDictionary<string, IReadOnlyList<Shortcut>>(new Dictionary<string, IReadOnlyList<Shortcut>>
                {
                    {"Explore", new List<Shortcut>
                        {
                            new Shortcut(1, "Go to everything", "Ctrl + T"),
                            new Shortcut(1, "Go to type (second hit)", "Ctrl + T"),
                            new Shortcut(1, "Go to symbol", "Shift+Alt+T"),
                            new Shortcut(1, "Go to file", "Ctrl + Shift + T"),
                            new Shortcut(1, "Go to file member", "Alt + \\"),
                            new Shortcut(1, "Find usages", "Shift + F12"),
                            new Shortcut(1, "Find usages (advanced)", "Ctrl + Shift + Alt + F12"),
                            new Shortcut(1, "Find Results Window", "Ctrl + Alt + F12"),
                            new Shortcut(1, "Highlight usages in file", "Shift + Alt + F11"),
                            new Shortcut(1, "Go to previous usage", "Ctrl + Alt + PgUp"),
                            new Shortcut(1, "Go to next usage", "Ctrl + Alt + PgDn"),
                            new Shortcut(1, "Analyze References window", "Ctrs + Alt + Y"),
                            new Shortcut(1, "Navigate to", "Alt + `"),
                            new Shortcut(1, "Go to declaration", " F12"),
                            new Shortcut(1, "Go to type of symbol", "Ctrl + Shift + F11"),
                            new Shortcut(1, "Go to implementation", "Ctrl + F12"),
                            new Shortcut(1, "Go to base symbols", "Alt + Home"),
                            new Shortcut(1, "Go to derived symbols", "Alt + End"),
                            new Shortcut(1, "Go to usage", "Shift + Alt + F12"),
                            new Shortcut(1, "File Structure", "Ctrl + Alt + F"),
                            new Shortcut(1, "Go to next member/tag", "Alt + DownArror"),
                            new Shortcut(1, "Go to previous member/tag", "Alt + UpArrow"),
                            new Shortcut(1, "Go to containing declaration", "Ctrl + ["),
                            new Shortcut(1, "To-do items", "Ctrl + Alt + D"),
                            new Shortcut(1, "Explore stack trace", "Ctrl + E, T"),
                            new Shortcut(1, "Locate in Solution Explorer", "Shift + Alt + L")
                        }
                    },
                    {"Create", new List<Shortcut>
                        {
                        new Shortcut(1, "Symbol code completion", "Ctrl + Space"),
                        new Shortcut(1, "Smart code completion", "Ctrl + Alt + Space"),
                        new Shortcut(1, "Import symbol completion", "Shift + Alt + Space"),
                        new Shortcut(1, "Complete statement", "Ctrl + Shift + Enter"),
                        new Shortcut(1, "Parameter info", "Ctrl + Shift + Alt + Space"),
                        new Shortcut(1, "Go to previous signature", "Ctrl + Shift + Alt + Space"),
                        new Shortcut(1, "Quick documentation", "Ctrl + Shift + F1"),
                        new Shortcut(0.25, "Move code up", "Ctrl + Shift + Alt + ArrowUp"),
                        new Shortcut(0.25, "Move code down", "Ctrl + Shift + Alt + ArrowDown"),
                        new Shortcut(0.25, "Move code left", "Ctrl + Shift + Alt + ArrowLeft"),
                        new Shortcut(0.25, "Move code right", "Ctrl + Shift + Alt + ArrowRight"),
                        new Shortcut(1, "Extend selection", "Ctrl + Alt + ArrowRight"),
                        new Shortcut(1, "Shrink selection", "Ctrl + Alt + ArrowLeft"),
                        new Shortcut(1, "Duplicate selection", "Ctrl + D"),
                        new Shortcut(1, "Select containing declaration", "Ctrl + Shift + ["),
                        new Shortcut(1, "Comment/uncomment line", "Ctrl + Alt + /"),
                        new Shortcut(1, "Comment/uncomment block", "Ctrl + Shift + /"),
                        new Shortcut(1, "Generate code", "Alt + Ins"),
                        new Shortcut(1, "Insert live template", "Ctr+E, L"),
                        new Shortcut(1, "Sorround with template", "Ctr + E, U"),
                        new Shortcut(1, "Go to last edit location", "Ctrl + Shift + Backspace"),
                        new Shortcut(1, "View recent files", "Ctrl + ,"),
                        new Shortcut(1, "View recent edits", "Ctrl + Shift + ,"),
                        new Shortcut(1, "Go to related files", "Ctrl + Alt + F7"),
                        new Shortcut(1, "View bookmarks", "Ctrl + `"),
                        new Shortcut(0.5, "Go to first bookmark", "Ctrl + 1"),
                        new Shortcut(0.5, "Go to second bookmark", "Ctrl + 2"),
                        new Shortcut(0.5, "Set remove first bookmark", "Ctrl + Shift + 1"),
                        new Shortcut(0.5, "Set remove second bookmark", "Ctrl + Shift + 2")
                        }
                    },
                    {
                        "Improve", new List<Shortcut>
                        {
                            new Shortcut(1, "Show available quick-fixes", "Alt + Enter"),
                            new Shortcut(1, "Inspect this", "Ctrl + Shift + Alt + A"),
                            new Shortcut(1, "Inspection Results window", "Ctrl + Alt + V"),
                            new Shortcut(1, "View type hierarchy", "Ctrl + E, H"),
                            new Shortcut(1, "Go to next highlight", "Alt + PgDn"),
                            new Shortcut(1, "Go to previous highlight", "Alt + PgUp"),
                            new Shortcut(1, "Go to next error", "Shift + Alt + PgDn"),
                            new Shortcut(1, "Go to previous error", "Shift + Alt + PgUp"),
                            new Shortcut(1, "Refactor this", "Ctrl + Shift + R"),
                            new Shortcut(1, "Rename", "Ctrl + R, R"),
                            new Shortcut(1, "Move type or static member", "Ctrl + R, O"),
                            new Shortcut(1, "Safe delete", "Ctrl + R, D"),
                            new Shortcut(1, "Extract method", "Ctrl + R, M"),
                            new Shortcut(1, "Introduce variable", "Ctrl + R, V"),
                            new Shortcut(1, "Introduce field", "Ctrl + R, F"),
                            new Shortcut(1, "Introduce parameter", "Ctrl + R, P"),
                            new Shortcut(1, "Inline", "Ctrl + R, I"),
                            new Shortcut(1, "Change signature", "Ctrl + R, S"),
                            new Shortcut(1, "Code Cleanup", "Ctrl + E, C"),
                            new Shortcut(1, "Run unit tests", "Ctrl + U, R"),
                            new Shortcut(1, "Debug unit tests", "Ctrl + U, D"),
                            new Shortcut(1, "Run all tests from solution", "Ctrl + U, L"),
                            new Shortcut(1, "Run current session", "Ctrl + U, Y"),
                            new Shortcut(1, "Repeat current session", "Ctrl + U, T"),
                            new Shortcut(1, "Unit Test Explorer", "Ctrl + Alt + U"),
                            new Shortcut(1, "Unit Test Sessions", "Ctrl + Alt + T")
                        }
                    }
                }
            ));

            ShortcutSheets = new List<EditorShortcutSheet>
            {
                visualStudioResharperSheet
            };
        }

        public IList<Shortcut> GetAllShortcuts([FromUri] string editor, [FromUri] IEnumerable<string> categories)
        {
            return ShortcutSheets.First(sheet => sheet.Editor == editor)
                 .Categories.Where(category => categories.Contains(category.Key)).SelectMany(category => category.Value).ToList();
        }
    }
}
