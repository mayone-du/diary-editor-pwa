"use server";

import * as cheerio from "cheerio";

/**
 * @see https://cdn.jsdelivr.net/npm/emoji-datasource@latest/emoji.json
 * Actual, has more properties, but troublesome :)
 */
type EmojiDataSource = {
  name: string;
  unified: string;
  non_qualified: string;
  image: string;
  sheet_x: number;
  sheet_y: number;
  short_name: string;
  short_names: string[];
  // NOTE: More Properties...
}[];

const EMOJI_DATA_SOURCE =
  "https://cdn.jsdelivr.net/npm/emoji-datasource@latest/emoji.json";

const getEmojiCodePoint = (emoji: string) => {
  return emoji.codePointAt(0)?.toString(16).toUpperCase();
};

export const getEmojiImageUrl = async (emoji: string) => {
  const codePoint = getEmojiCodePoint(emoji);
  const emojiDataSourceRes = await fetch(EMOJI_DATA_SOURCE);
  const emojiDataSource = (await emojiDataSourceRes.json()) as EmojiDataSource;

  const hit = emojiDataSource.find((item) => item.unified === codePoint);
  if (!hit) return "";

  const emojiLowerHyphenCase = hit.name.toLowerCase().replaceAll(" ", "-");
  const searchUrl = `https://emojipedia.org/microsoft-teams/15.0/${emojiLowerHyphenCase}`;

  const res = await fetch(searchUrl);
  const html = await res.text();
  const $ = cheerio.load(html);
  const imageUrl = $(
    'img[src*="https://em-content.zobj.net/source/microsoft-teams/363/"]'
  ).attr("src");
  return imageUrl || "";
};

// const x = 123; // number
// const codepoints = emojiDataSource[x].unified.split("-").map((cp) => {
//   return parseInt(cp, 16);
// });
// console.log(codepoints);
// console.log(String.fromCodePoint(...codepoints));
