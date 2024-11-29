using System;
using AuctionService.Data;
using Contracts;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using RabbitMQ.Client;

namespace AuctionService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{

    private AuctionDbContext _dbContext;
    public AuctionFinishedConsumer(AuctionDbContext dbContext) {
        _dbContext = dbContext;
    }
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine("--> consuming Auction finished ");
        var auction = await _dbContext.Auctions.FindAsync(context.Message.AuctionId);
        if (context.Message.ItemSold) {
            auction.Winner = context.Message.Winner;
            auction.SoldAmount = context.Message.Amount;

        }

        auction.Status =  context.Message.Amount > auction.ReservePrice ? Entities.Status.Finished : Entities.Status.ReserveNotMet;

        await _dbContext.SaveChangesAsync();
    }
}