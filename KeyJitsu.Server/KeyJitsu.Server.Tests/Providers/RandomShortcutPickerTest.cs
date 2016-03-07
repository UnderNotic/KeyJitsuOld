using System;
using System.Collections.Generic;
using System.Linq;
using KeyJitsu.Server.Models;
using KeyJitsu.Server.Services;
using Newtonsoft.Json.Linq;
using NUnit.Framework;

namespace KeyJitsu.Server.Tests.Providers
{
    [TestFixture]
    public class RandomShortcutPickerTest
    {
        [Test]
        public void GetRandomShortcutBasedOnProrities_Doent_Return_Above()
        {
            // Arrange
            var shortcuts = new List<Shortcut>
            {
                new Shortcut(1, "Symbol code completion", "Ctrl + Space"),
                new Shortcut(1, "Smart code completion", "Ctrl + Alt + Space"),
                new Shortcut(2, "Import symbol completion", "Shift + Alt + Space")
            };

            var picker = new RandomShortcutPicker();

            // Act
            var pick = picker.GetRandomShortcutBasedOnPriorities(shortcuts);
            
            // Assert
            Assert.IsNotNull(picker);
            CollectionAssert.IsSubsetOf(new List<Shortcut> {pick}, shortcuts);
        }
    }
}
