using MassTransit;
using Microsoft.AspNetCore.WebUtilities;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Consumers;
using SearchService.Data;
using SearchService.Models;
using SearchService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddHttpClient<AuctionSvcHttpClient>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddMassTransit(x=> {
    x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
    // x.AddConsumersFromNamespaceContaining<AuctionUpdatedConsumer>();
    // x.AddConsumersFromNamespaceContaining<AuctionDeletedConsumer>();
    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search",false));
    x.UsingRabbitMq((context,cfg) => {
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", cfg => {
            cfg.Username(builder.Configuration.GetValue("RabbitMq:Username","guest"));
            cfg.Password(builder.Configuration.GetValue("RabbitMq:Password","guest"));
        });
        // cfg.ConfigureEndpoints(context);
    
        cfg.ReceiveEndpoint("search-auction-created", e => {
            e.UseMessageRetry(r=> {
                r.Interval(5,5);
            });
            e.ConfigureConsumer<AuctionCreatedConsumer>(context);
        });
        x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search",false));
        cfg.ConfigureEndpoints(context);
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

app.UseAuthorization();

app.MapControllers();

app.UseRouting();
app.UseStaticFiles();

try
{
    await DbInitializer.InitDb(app);
}
catch (Exception e)
{
    
    Console.WriteLine(e);
}

app.Run();
