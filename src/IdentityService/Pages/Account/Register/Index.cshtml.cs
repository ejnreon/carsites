using System.Security.Claims;
using IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.V5.Pages.Account.Internal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace IdentityService.Pages.Account.Register
{
    [SecurityHeaders]
    [AllowAnonymous]
    public class Index : PageModel
    {
        private  readonly UserManager<ApplicationUser> _userManager;
        public Index(UserManager<ApplicationUser> userManager){
            _userManager = userManager;
        }

        [BindProperty]
        public RegisterViewModel Input { get; set; }

        [BindProperty]
        public bool RegisterSuccess { get; set; }

        public async Task<IActionResult> OnGet(string? returnUrl)
        {
            Input = new RegisterViewModel();
            Input.returnUrl = returnUrl;
            return Page();
        }

        public async Task<IActionResult> OnPost() {
            if (Input.Button != "Register") return Redirect("~/");
            if (ModelState.IsValid) {
                var user = new ApplicationUser{
                    UserName = Input.FullName,
                    Email = Input.Email,
                    EmailConfirmed = true,
                    

                };
                _userManager.PasswordValidators.Clear();
                var result = await _userManager.CreateAsync(user, Input.Password);

                Console.WriteLine(result.ToString());
               
                if (result.Succeeded) {
                        await _userManager.AddClaimsAsync(user, new Claim[]{
                            new Claim(JwtClaimTypes.Name, Input.FullName),
                            
                        });
                    RegisterSuccess = true;
                }
            }

            return Page();

        }
    }
}
