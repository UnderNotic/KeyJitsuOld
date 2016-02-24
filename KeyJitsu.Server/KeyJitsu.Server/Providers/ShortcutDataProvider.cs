using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using KeyJitsu.Server.Models;

public class ShortcutDataProvider
{
    public EditorShortcutSheet VisualStudioSheet { get; }
    public EditorShortcutSheet VsCodeSheet { get; }
    public EditorShortcutSheet IntellijSheet { get; }

    public ShortcutDataProvider()
    {
        VisualStudioSheet = new EditorShortcutSheet("VisualStudio",
            new ReadOnlyDictionary<string, ReadOnlyDictionary<string, string>>(new Dictionary<string, ReadOnlyDictionary<string, string>>
            {
                {"Navigation", new ReadOnlyDictionary<string, string>(new Dictionary<string, string>
                {
                    {"Go to somewhere", "Ctrl + X" },
                    {"Go to somewhere2", "Ctrl + R" }
                })},
                {"Refactoring", new ReadOnlyDictionary<string, string>(new Dictionary<string, string>
                {
                    {"Refactor1", "Ctrl + Z" },
                    {"Refactor2", "Ctrl + A" }
                })}
            }));
    }
}