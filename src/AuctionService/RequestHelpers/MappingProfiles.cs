using System;
using AuctionDTOs;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Contracts;

namespace AuctionService.RequestHelpers;

public class MappingProfiles:Profile
{

public MappingProfiles() {
     CreateMap<Auction, AuctionDTO>().IncludeMembers(x => x.Item);
     CreateMap<Item, AuctionDTO>();
     CreateMap<CreateAuctionDTO, Auction>()
        .ForMember(d => d.Item, o => o.MapFrom(s => s));
        //mapowanie d = destination , o = mapowany obiekt , na s = source (CreateAuctionDTO)// czyli dla (d)estination Auction.Item, zmapuj (o)biekt.MapFrom (s) ource  
    CreateMap<CreateAuctionDTO,Item>();
    CreateMap<AuctionDTO,AuctionCreated>();
    CreateMap<Auction,AuctionUpdated>().IncludeMembers(x => x.Item);
    CreateMap<Item,AuctionUpdated>();
}

}
