﻿using Duende.IdentityServer.Models;

namespace IdentityService;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("auctionApp","Auction APP full access"),
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            new Client{
                ClientId = "postman",
                ClientName = "postman",
                AllowedScopes = {"openid","profile","auctionApp"},
                RedirectUris = {"https://www.postman.com/oauth2/callback"},
                ClientSecrets = new [] { new Secret("NotASecret".Sha256())},
                AllowedGrantTypes = {GrantType.ResourceOwnerPassword}

            },

                    
            new Client{
                ClientId = "nextApp",
                ClientName = "nextApp",
                AllowedScopes = {"openid","profile","auctionApp"},
                RedirectUris = {"http://localhost:3000/api/auth/callback/id-server"},
                ClientSecrets = new [] { new Secret("secret".Sha256())},
                AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                RequirePkce = false,
                AllowOfflineAccess = true,
                AccessTokenLifetime = 3600*24*30

            }

        };
}
