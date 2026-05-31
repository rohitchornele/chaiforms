// import { NextResponse } from "next/server";

// import type { NextRequest } from "next/server";

// export function proxy(
//   request: NextRequest
// ) {

//   const token =
//      request.cookies.get(
//       "authentication-token"
//     )?.value;

//   const pathname =
//     request.nextUrl.pathname;

//   const isDashboardRoute =
//     pathname.startsWith(
//       "/dashboard"
//     );

//   const isAuthRoute =

//     pathname.startsWith(
//       "/login"
//     ) ||

//     pathname.startsWith(
//       "/signup"
//     );

//   /*
//    * Protect Dashboard Routes
//    */
//   if (
//     isDashboardRoute &&
//     !token
//   ) {

//     const loginUrl =
//       new URL(
//         "/login",
//         request.url
//       );

//     loginUrl.searchParams.set(
//       "callbackUrl",
//       pathname
//     );

//     return NextResponse.redirect(
//       loginUrl
//     );
//   }

//   /*
//    * Prevent Logged In Users
//    * From Visiting Auth Pages
//    */
//   if (isAuthRoute && token
//   ) {

//     return NextResponse.redirect(
//       new URL(
//         "/dashboard",
//         request.url
//       )
//     );
//   }

//   /*
//    * Allow Everything Else
//    *
//    * Including:
//    * /
//    * /explore
//    * /pricing
//    * /form/public/*
//    */
//   return NextResponse.next();
// }

// export const config = {

//   matcher: [

//     /*
//     * Auth Routes
//     */
//     "/login",

//     "/signup",

//     /*
//      * Protected Routes
//      */
//     // "/dashboard/:path*",


//   ],
// };




import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token =
    request.cookies.get("authentication-token")?.value;

    console.log("TOKEN:", token);

  const pathname = request.nextUrl.pathname;

  console.log("pathname:", pathname);

  const isDashboardRoute =
    pathname.startsWith("/dashboard");

  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup");

  // Protect dashboard routes
  if (isDashboardRoute && !token) {
    const loginUrl = new URL(
      "/login",
      request.url
    );

    loginUrl.searchParams.set(
      "callbackUrl",
      pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  // Prevent authenticated users
  // from accessing login/signup
  if (isAuthRoute && token) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};