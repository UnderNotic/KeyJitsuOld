using System;
using System.Collections.Generic;
using KeyJitsu.Server.Models;
using KeyJitsu.Server.Services;
using NUnit.Framework;

namespace KeyJitsu.Server.Tests
{
    [TestFixture]
    public class RandomShortcutPickerTest
    {
        [Test]
        public void GetRandomShortcutBasedOnProrities_Doent_Return_Above()
        {
            var shortcuts = new List<Shortcut>
            {
                new Shortcut(1, "Symbol code completion", "Ctrl + Space"),
                new Shortcut(1, "Smart code completion", "Ctrl + Alt + Space"),
                new Shortcut(2, "Import symbol completion", "Shift + Alt + Space")
            };


            var picker = new RandomShortcutPicker();


            var pick = picker.GetRandomShortcutBasedOnPriorities(shortcuts);


            var x = 0;


        }
    }
}
