using System.IdentityModel.Tokens.Jwt;
using System.Text;
using AuctionService.Consumers;
using AuctionService.Data;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AuctionDbContext>( opt => {
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

builder.Services.AddMassTransit(x=> {

    x.UsingRabbitMq((context,cfg) => {
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", cfg => {
            cfg.Username(builder.Configuration.GetValue("RabbitMq:Username","guest"));
            cfg.Password(builder.Configuration.GetValue("RabbitMq:Password","guest"));
        });
        cfg.ConfigureEndpoints(context);
    });
    x.AddEntityFrameworkOutbox<AuctionDbContext>( o => {
        o.QueryDelay = TimeSpan.FromSeconds(10);
        o.UsePostgres();
        o.UseBusOutbox(); 
    });
    x.AddConsumersFromNamespaceContaining<AuctionCreatedFaultConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("auction",false));
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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
        options.TokenValidationParameters.SignatureValidator = (token,_) => {
            // _.va
            return new JsonWebToken(token);
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

try
{
    DbInitializer.InitDb(app);
}
catch (Exception e)
{
    
    Console.WriteLine(e);
}

app.Run();
