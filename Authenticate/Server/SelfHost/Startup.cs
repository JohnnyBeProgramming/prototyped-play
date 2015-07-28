using Owin;
using SelfHost.Config;
using System.Collections.Generic;
using Thinktecture.IdentityServer.Core.Configuration;
using Thinktecture.IdentityServer.Host.Config;

namespace SelfHost
{
    internal class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // -------------------------------------------------------------------------------
            // Define the providers...
            var factory = InMemoryFactory.Create(
                users:   Users.Get(), 
                clients: Clients.Get(), 
                scopes:  Scopes.Get());
            
            // Set up the identity server
            var opts = DefineIdentityServer(factory);
            app.UseIdentityServer(opts);
            // -------------------------------------------------------------------------------

            // -------------------------------------------------------------------------------
            // Set up server-side security tokens...
            /*
            JwtSecurityTokenHandler.InboundClaimTypeMap = new Dictionary<string, string>();
            app.UseIdentityServerBearerTokenAuthentication(new IdentityServerBearerTokenAuthenticationOptions
            {
                Authority = "https://localhost:44333/core"
            });

            var config = new HttpConfiguration();
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter("Bearer"));

            // Enables authentication globally...
            //config.Filters.Add(new AuthorizeAttribute()); 

            config.MapHttpAttributeRoutes();
            config.Formatters.Remove(config.Formatters.XmlFormatter);
            config.Formatters.Remove(config.Formatters.FormUrlEncodedFormatter);
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver =
                new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();
            app.UseWebApi(config);
            */
            // -------------------------------------------------------------------------------

        }

        private IdentityServerOptions DefineIdentityServer(IdentityServerServiceFactory factory)
        {
            var options = new IdentityServerOptions
            {
                IssuerUri = "https://idsrv3.com",
                SiteName = "Thinktecture IdentityServer3 (self host)",

                SigningCertificate = Certificate.Get(),
                Factory = factory,

                CorsPolicy = CorsPolicy.AllowAll,
            };
            return options;
        }
    }
}