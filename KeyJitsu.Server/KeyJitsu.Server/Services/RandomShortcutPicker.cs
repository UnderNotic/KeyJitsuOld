using System;
using System.Collections.Generic;
using System.Linq;
using KeyJitsu.Server.Models;

namespace KeyJitsu.Server.Services
{
    public interface IRandomShortcutPicker
    {
        Shortcut GetRandomShortcutBasedOnPriorities(IList<Shortcut> shortcuts);
    }

    public class RandomShortcutPicker : IRandomShortcutPicker
    {
        private readonly Random _random = new Random();

        public RandomShortcutPicker()
        {
        }

        public Shortcut GetRandomShortcutBasedOnPriorities(IList<Shortcut> shortcuts)
        {
            var prioritySum = shortcuts.Sum(shortcut => shortcut.Priority);
            var rnd = _random.NextDouble() * prioritySum;

            var tempSum = 0d;
            foreach (var shortcut in shortcuts)
            {
                tempSum += shortcut.Priority;
                if (tempSum >= rnd)
                {
                    return shortcut;
                }
            }
            return shortcuts.Last();
        }
    }
}