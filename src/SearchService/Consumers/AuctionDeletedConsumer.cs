using System;
using Contracts;
using MassTransit;
using MassTransit.Testing;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionDeletedConsumer : IConsumer<AuctionDeleted>
{
    public async Task Consume(ConsumeContext<AuctionDeleted> context)
    {
        Console.WriteLine("--> consuming delete que forid : "+context.Message.Id);
        var result = await DB.DeleteAsync<Item>(x=>x.ID == context.Message.Id);

        if (!result.IsAcknowledged) {
            Console.WriteLine("Problem witch MongoDB delete");
        }
    }
}
