using System;
using System.Text.Json;
using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Services;

namespace SearchService.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app) {
        await DB.InitAsync("SearchService", MongoClientSettings.FromConnectionString(app.Configuration.GetConnectionString("MongoDBConnectionString")));
        await DB.Index<Item>()
            .Key(x=> x.Make, KeyType.Text)
            .Key(x=> x.Color, KeyType.Text)
            .Key(x=> x.Model, KeyType.Text)
            .CreateAsync();

        var count = await DB.CountAsync<Item>();


            using var scope = app.Services.CreateScope();
            var httpClient = scope.ServiceProvider.GetService<AuctionSvcHttpClient>();
            var items = await httpClient.GetItemsForSearchDb();
            Console.WriteLine(items.Count +" returned from auction service");
            if (items.Count > 0) {

                await DB.SaveAsync(items);
            }

            // Console.WriteLine("No data will atempt to seed");
            // var itemData = await File.ReadAllTextAsync("Data/auctions.json");
            // var options = new JsonSerializerOptions{PropertyNameCaseInsensitive= true};
            // var items = JsonSerializer.Deserialize<List<Item>>(itemData,options);

            // await DB.SaveAsync(items);
        
    }

}
