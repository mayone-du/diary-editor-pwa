import { NextRequest, NextResponse } from "next/server";

const IP_WHITELIST = ["119.175.138.63"];

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
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const ip = request.ip ?? request.headers.get("x-real-ip");

  if (!ip || !IP_WHITELIST.includes(ip)) {
    return Response.json(
      { success: false, message: "authentication failed" },
      { status: 401 }
    );
  }
};
