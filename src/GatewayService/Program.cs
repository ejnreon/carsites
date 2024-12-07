using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));


builder.Services.AddAuthentication()
    .AddJwtBearer(options=> {
        // options.Authority = builder.Configuration["IdentityServiceUrl"];
        options.IncludeErrorDetails = true;
        options.RequireHttpsMetadata = false;
        options.UseSecurityTokenValidators = false;
        options.TokenValidationParameters.ValidateAudience = false;
        // options.TokenValidationParameters.ValidIssuer = builder.Configuration.GetValue("ValidIssuer","http://localhost:5000");
        options.TokenValidationParameters.NameClaimType = "username";      
        // options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("abcdefghi12345"));
        options.TokenValidationParameters.ValidateIssuer = false;
        options.TokenValidationParameters.ValidateIssuerSigningKey = false;
        // options.TokenValidationParameters.auth
        options.TokenValidationParameters.SignatureValidator = (token,_) => new JsonWebToken(token);
    });

var app = builder.Build();

app.MapReverseProxy();

app.UseAuthentication();
app.UseAuthorization();

app.Run();
