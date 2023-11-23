import { NextRequest, NextResponse } from "next/server";

const IP_WHITELIST = ["xxx"];

type IPInfo = {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
  readme: string;
};

const IPINFO_TOKEN = process.env.IPINFO_TOKEN;

const getIP = async () => {
  const res = await fetch(`https://ipinfo.io/?token=${IPINFO_TOKEN}&callback`);
  const data = await res.json();
  return data as IPInfo;
};

export const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname === "/error") {
    return NextResponse.next();
  }
  const { ip } = await getIP();
  console.log(ip);
  console.log("request.ip: ", request.ip);
  console.log("x-real-ip: ", request.headers.get("x-real-ip"));
  if (!IP_WHITELIST.includes(ip)) {
    // return NextResponse.redirect("https://www.google.com");
    return null;
  }
};
