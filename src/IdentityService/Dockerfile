FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
#dockerfilesystem  WORKDIR /src 
WORKDIR /app 
EXPOSE 80

#copy all .csproj files
COPY Carsties.sln Carsties.sln
COPY src/AuctionService/*.csproj src/AuctionService/
COPY src/Contracts/*.csproj src/Contracts/
COPY src/GatewayService/*.csproj src/GatewayService/
COPY src/IdentityService/*.csproj src/IdentityService/
COPY src/SearchService/*.csproj src/SearchService/


#restore package dependencies
RUN dotnet restore Carsties.sln

COPY src/IdentityService src/IdentityService
WORKDIR /app/src/IdentityService
RUN dotnet publish -c Release -o /app/src/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 as production
COPY --from=build /app/src/out .
ENTRYPOINT [ "dotnet", "IdentityService.dll" ]