import { logoutRedirect } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  return logoutRedirect({ postLogoutRedirectURL: "https://sohams.kinde.com/" }); 
}
