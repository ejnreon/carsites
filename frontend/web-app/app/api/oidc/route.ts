// https://medium.com/@nbryleibanez/secure-oauth-2-0-flow-with-proof-of-key-code-exchange-pkce-using-amazon-cognito-and-next-js-329d9ccefe5c

// app/api/auth/google-sign-in/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import crypto from "crypto";
import { encrypt } from "@/lib/encryption";
import queryString from "query-string";

const { CUSTOM_AUTH_URL, CUSTOM_CLIENT_ID, CUSTOM_REDIRECT_URL } = process.env;

// https://clerk.com/blog/oauth2-react-user-authorization
// https://github.com/antosubash/blog/blob/main/data/_posts/next-oidc/openid-connect-with-nextjs-with-openid-client-6-and-next-15.mdx

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const authorizeParams = new URLSearchParams();
  const origin = request.nextUrl.origin;

  const state = crypto.randomBytes(16).toString("hex");

  // Generate the PKCE code verifier and code challenge
  const codeVerifier = crypto.randomBytes(64).toString("base64url");
  const codeVerifierHash = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest();
  const codeChallenge = codeVerifierHash
    .toString("base64url")
    .replace(/=+$/, "");

  authorizeParams.append("response_type", "code");
  authorizeParams.append("client_id", CUSTOM_CLIENT_ID as string);

  authorizeParams.append("redirect_uri", CUSTOM_REDIRECT_URL as string);
  authorizeParams.append("state", state);
  //   authorizeParams.append("identity_provider", "Google");
  authorizeParams.append("scope", "openid profile auctionApp");
  authorizeParams.append("code_challenge_method", "S256");
  authorizeParams.append("code_challenge", codeChallenge);

  // Encrypt the code verifier
  const encryptedCodeVerifier = encrypt(codeVerifier);

  // Set the code verifier in an HTTP-only cookie
  cookieStore.set("code_verifier", encryptedCodeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    // sameSite: "none",
    expires: Date.now() + 300000,
  });

  return NextResponse.redirect(
    `${CUSTOM_AUTH_URL}?${authorizeParams.toString()}`,
  );
}
