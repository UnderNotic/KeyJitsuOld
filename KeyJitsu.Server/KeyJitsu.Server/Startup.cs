using System;
using System.Diagnostics;
using System.Reflection;
using System.Threading.Tasks;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(KeyJitsu.Server.Startup))]

namespace KeyJitsu.Server
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var httpConfig = new HttpConfiguration();
            ConfigureRouting(httpConfig);

            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            RegisterServices(builder);
            var container = builder.Build();
            httpConfig.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            app.UseAutofacMiddleware(container);
            app.UseAutofacWebApi(httpConfig);
            app.UseWebApi(httpConfig);
        }

        private void ConfigureRouting(HttpConfiguration httpConfiguration)
        {
            httpConfiguration.MapHttpAttributeRoutes();

            httpConfiguration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

        }

        private void RegisterServices(ContainerBuilder builder)
        {
            
        }
    }
}
