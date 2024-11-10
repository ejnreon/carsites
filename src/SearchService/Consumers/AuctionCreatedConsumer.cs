using System;
using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    private IMapper _mapper;
    public AuctionCreatedConsumer(IMapper mapper) {
        _mapper = mapper;

    }
    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine("---> consuming auction dreates: " + context.Message.Id);
        var item = _mapper.Map<Item>(context.Message);
        if (item.Model == "Foo") throw new ArgumentException("Cannot sell cars with name of Foo");
        await item.SaveAsync();
        
        // await DB.SaveAsync(item);
    }
}
