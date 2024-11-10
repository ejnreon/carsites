using System;
using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
{
    public IMapper _mapper;
    public AuctionUpdatedConsumer(IMapper mapper) {
        _mapper = mapper;
    }

    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        Console.WriteLine("---> consuming auction update: " + context.Message.Id);
        var item = _mapper.Map<AuctionUpdated>(context.Message);
        var result = await DB.Update<Item>().MatchID(item.Id)
        .Modify(x=>x.Make, item.Make)
        .Modify(x=>x.Model, item.Model)
        .Modify(x=>x.Year, item.Year) 
        .Modify(x=>x.Color, item.Color)
        .Modify(x=>x.Mileage, item.Mileage)
        .ExecuteAsync();

        if (!result.IsAcknowledged) {
            Console.WriteLine("Problem witch MongoDB update save");
                    }

    }
}
