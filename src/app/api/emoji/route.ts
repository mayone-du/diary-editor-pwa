import puppeteer from "puppeteer";

// emojipedia.org から画像を取得する
export const POST = async (req: Request) => {
  const { emoji } = await req.json();
  const searchUrl = `https://emojipedia.org/${emoji}#designs`;
  const browser = await puppeteer.launch({
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      "--single-process",
    ],
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(5000); // 5sec
  page.setRequestInterception(true);
  // 不要なリクエストを排除
  page.on("request", (request) => {
    const requestUrl = request.url();
    if (requestUrl.includes("https://emojipedia.org/")) {
      request.continue().catch((err) => console.error(err));
    } else {
      request.abort().catch((err) => console.error(err));
    }
  });
  await page.goto(searchUrl);
  const imgSelector = await page.waitForSelector(
    'img[src*="https://em-content.zobj.net/source/microsoft-teams/"]'
  );
  const imageUrl = await page.evaluate((imgSelector) => {
    return imgSelector?.getAttribute("src");
  }, imgSelector);

  await browser.close();
  return Response.json({ imageUrl });
};
