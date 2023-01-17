import { NextResponse } from "next/server";
import { useRecoilValue } from "recoil";
import { getFromLocalStorage } from "./utils/browserStorage";

export default function middleware(req) {
  // const token = getFromLocalStorage("token");
  const url = req.nextUrl.clone();
  req.hea;
  //   if (url.pathname === "/admin" || url.pathname === "/user") {
  //     if (token === undefined) {
  //       url.pathname = "/login";
  //       return NextResponse.redirect(url);
  //     }
  //   }
  return NextResponse.next();
}
