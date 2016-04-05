using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using KeyJitsu.Server.Controllers;
using KeyJitsu.Server.Providers;
using KeyJitsu.Server.Services;
using Moq;
using NUnit.Framework;

namespace KeyJitsu.Server.Tests.Controllers
{
    [TestFixture]
    public class ShortcutConstrollerTest
    {
        [Test]
        public void GetAllShortcuts_Returns_Correctly()
        {
            // Arrange
            var provider = new ShortcutDataProvider();
            var controller = new ShortcutsController(provider, new Mock<IRandomShortcutPicker>().Object);


            // Act
            var response = controller.GetAllShortcuts("VisualStudioResharper", new[] { "Explore" });


            // Assert

            var expectedResult =
                provider.ShortcutSheets.First(sheet => sheet.Editor == "VisualStudioResharper")
                    .Categories.First(category => category.Key == "Explore").Value;

            CollectionAssert.AreEqual(expectedResult, response);
        }

        [Test]
        public void Get_Single_Shortcut_Returns_Corretly()
        {
            // Arrange
            var provider = new ShortcutDataProvider();
            var controller = new ShortcutsController(provider, new Mock<IRandomShortcutPicker>().Object);


            // Act
            var response = controller.GetAllShortcuts("VisualStudioResharper", new[] { "Create", "Improve" }).ToList();


            // Assert
            var expectedResult =
                provider.ShortcutSheets.First(sheet => sheet.Editor == "VisualStudioResharper")
                    .Categories.Where(category => category.Key == "Create" || category.Key == "Improve").SelectMany(pair => pair.Value).ToList();


            Assert.AreEqual(expectedResult.Count(), response.Count());
            CollectionAssert.AreEqual(expectedResult, response);
        }

        [Test]
        public void Get_Single_Shortcut_Answer_Returns_False_When_Shortcut_Doesnt_Exist()
        {
            // Arrange
            var provider = new ShortcutDataProvider();
            var controller = new ShortcutsController(provider, new Mock<IRandomShortcutPicker>().Object);
            
            // Act
            var response = controller.GetSingleShortcutAnswer("VisualStudioResharper", "Doesnt exist", "Doesnt matter");

            // Assert
            var expectedResult = false;

            Assert.AreEqual(expectedResult, response);
        }

        [Test]
        public void Get_Single_Shortcut_Answer_Returns_False_When_Editor_Doesnt_Exist()
        {
            // Arrange
            var provider = new ShortcutDataProvider();
            var controller = new ShortcutsController(provider, new Mock<IRandomShortcutPicker>().Object);

            // Act
            var response = controller.GetSingleShortcutAnswer("Doesnt exist", "Doesnt matter", "Doesnt matter");

            // Assert
            var expectedResult = false;

            Assert.AreEqual(expectedResult, response);
        }

        [Test]
        public void Get_Single_Shortcut_Answer_Returns_Correctly()
        {
            // Arrange
            var provider = new ShortcutDataProvider();
            var controller = new ShortcutsController(provider, new Mock<IRandomShortcutPicker>().Object);

            // Act
            var response1 = controller.GetSingleShortcutAnswer("VisualStudioResharper", "Go to everything", "Ctrl + T");
            var response2 = controller.GetSingleShortcutAnswer("VisualStudioResharper", "Go to everything", "Ctrl + X");

            // Assert
            var expectedResult1 = true;
            var expectedResult2 = false;

            Assert.AreEqual(expectedResult1, response1);
            Assert.AreEqual(expectedResult2, response2);
        }
    }
}