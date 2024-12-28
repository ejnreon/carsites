// import { cookies } from 'next/headers'
// import { NextResponse, type NextRequest } from "next/server";
import { User } from "@/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";


const isTokenExpired = (token:string) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export async function getAuth() {
  const cookiesList = await cookies();
  const token = cookiesList.get("id_token")?.value;
  if (isTokenExpired(token)) {
    return {token_expired: true};
  } else {
    return jwtDecode(token)
  }

}


// export async function getCurrentUser() {
//     try {
//       const cookieStore = await cookies();
//         const session = cookieStore.get("access_token")?.value

//         if (!session) {
//             return null;
//         } else {
//             return session.user;
//         }
//     } catch (error) {
//         return null;
//     }
// }
// https://curity.io/resources/learn/openid-code-flow/
// https://developers.onelogin.com/openid-connect/enable-app #wybór java spring
// https://curity.io/resources/learn/openid-code-flow/



