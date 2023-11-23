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

const getIP = async () => {
  // NOTE: Rate Limitにかかるとエラーになるため一旦コメントアウト
  // TODO: リリース時には必須にする。ipinfoにサインアップするか、Next.jsの機能で取得
  // {
  //   "status": 429,
  //   "error": {
  //     "title": "Rate limit exceeded",
  //     "message": "You've hit the daily limit for the unauthenticated API.  Create an API access token by signing up to get 50k req/month."
  //   }
  // }

  const res = await fetch("https://ipinfo.io/?callback");
  const data = await res.json();
  return data as IPInfo;
};

export const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname === "/error") {
    return NextResponse.next();
  }
  // const { ip } = await getIP();
  // if (!IP_WHITELIST.includes(ip)) {
  //   return NextResponse.redirect("/error");
  // }
};
