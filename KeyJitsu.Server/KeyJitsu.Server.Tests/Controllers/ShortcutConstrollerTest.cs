using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using KeyJitsu.Server.Controllers;
using KeyJitsu.Server.Providers;
using KeyJitsu.Server.Services;
using Moq;
using NUnit.Framework;
using NUnit.Framework.Internal;

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
        public void Get_Return_Corretly_2()
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
    }
}