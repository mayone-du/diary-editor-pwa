import data from "@emoji-mart/data";
import { getEmojiDataFromNative, init } from "emoji-mart";
// import { CONSTANTS } from "src/constant";
// import type { EmojiDataSource } from "src/types";

const EMOJI_DATASOURCE =
  "https://cdn.jsdelivr.net/npm/emoji-datasource@14.0/emoji.json";

/**
 * @see https://cdn.jsdelivr.net/npm/emoji-datasource@latest/emoji.json
 * Actual, has more properties, but troublesome :)
 */
export type EmojiDataSource = {
  name: string;
  /** 'UPPER-HYPHEN-CASE' */
  unified: string;
  non_qualified: string;
  image: string;
  sheet_x: number;
  sheet_y: number;
  /** 'hyphen-case' */
  short_name: string;
  short_names: string[];
  // NOTE: More Properties...
  skin_variations: {
    "1F3FB": {
      unified: `${string}-1F3FB`;
      non_qualified: null;
      image: `${string}-1f3fb.png`;
      sheet_x: number;
      sheet_y: number;
      added_in: string;
      has_img_apple: boolean;
      has_img_google: boolean;
      has_img_twitter: boolean;
      has_img_facebook: boolean;
    };
    "1F3FC": {
      unified: `${string}-1F3FC`;
      non_qualified: null;
      image: `${string}-1f3fc.png`;
      sheet_x: number;
      sheet_y: number;
      added_in: string;
      has_img_apple: true;
      has_img_google: true;
      has_img_twitter: true;
      has_img_facebook: true;
    };
    "1F3FD": {
      unified: `${string}-1F3FD`;
      non_qualified: null;
      image: `${string}-1f3fd.png`;
      sheet_x: number;
      sheet_y: number;
      added_in: string;
      has_img_apple: true;
      has_img_google: true;
      has_img_twitter: true;
      has_img_facebook: true;
    };
    "1F3FE": {
      unified: `${string}-1F3FE`;
      non_qualified: null;
      image: `${string}-1f3fe.png`;
      sheet_x: number;
      sheet_y: number;
      added_in: string;
      has_img_apple: true;
      has_img_google: true;
      has_img_twitter: true;
      has_img_facebook: true;
    };
    "1F3FF": {
      unified: `${string}-1F3FF`;
      non_qualified: null;
      image: `${string}-1f3ff.png`;
      sheet_x: number;
      sheet_y: number;
      added_in: string;
      has_img_apple: true;
      has_img_google: true;
      has_img_twitter: true;
      has_img_facebook: true;
    };
  };
}[];

init({ data });

type EmojiData = {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
  skin: 1 | 2 | 3 | 4 | 5 | 6;
};

const EMOJI_SKIN_TONE_MAP = {
  "skin-tone-1": "",
  "skin-tone-2": "light-skin-tone",
  "skin-tone-3": "medium-light-skin-tone",
  // NOTE: mediumはfluent emojiではdefaultと同じとして扱われる？存在しないため、defaultとして扱う
  "skin-tone-4": "",
  "skin-tone-5": "medium-dark-skin-tone",
  "skin-tone-6": "dark-skin-tone",
} as const;

// NOTE: 詳細は src/types.tsを参照
const SKIN_TONE_UNIFIED_MAP = {
  "skin-tone-1": "1f3fb",
  "skin-tone-2": "1f3fc",
  "skin-tone-3": "1f3fd",
  "skin-tone-4": "1f3fb",
  "skin-tone-5": "1f3fe",
  "skin-tone-6": "1f3ff",
} as const;

const isSkinTone = (str: string): str is keyof typeof EMOJI_SKIN_TONE_MAP => {
  return Object.keys(EMOJI_SKIN_TONE_MAP).includes(str);
};

export const getEmojiImage = async (emoji: string) => {
  // // const emoji = "🤜🏿";
  // // const emoji = "🤜🏾";
  // const emoji = "🤜🏼";
  const emojiData: EmojiData = await getEmojiDataFromNative(emoji);

  // const emojiDataSourceRes = await fetch(EMOJI_DATASOURCE);
  // const emojiDataSource = (await emojiDataSourceRes.json()) as EmojiDataSource;
  // console.log(emojiData);

  // 文字列から::以降の文字があれば取得
  const skinTone = emojiData.shortcodes.split("::")[1]?.slice(0, -1); // 最後の:も削除

  // if (!hit) return "";
  const emojiNameHyphenCase = emojiData.name
    .replaceAll("_", "-")
    .replaceAll(" ", "-")
    .toLowerCase(); // emojipediaの画像名がhyphen-caseのため合わせる
  const imageName = (() => {
    if (!skinTone || !isSkinTone(skinTone))
      return `${emojiNameHyphenCase}_${emojiData.unified}`;
    return `${emojiNameHyphenCase}_${EMOJI_SKIN_TONE_MAP[skinTone]}_${emojiData.unified}_${SKIN_TONE_UNIFIED_MAP[skinTone]}`;
  })();
  const imageUrl = `https://em-content.zobj.net/source/microsoft-teams/363/${imageName}.png`;
  return imageUrl;
};
