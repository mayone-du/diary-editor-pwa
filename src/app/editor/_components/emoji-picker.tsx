"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";
import { getEmojiImageUrl } from "./actions";

export const EmojiPicker = () => {
  const [imageUrl, setImageUrl] = useState("");
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {imageUrl && <img src={imageUrl} alt="emoji" />}
      <Picker
        data={data}
        onEmojiSelect={async (emojiData: {
          id: string; // snakce_case
          keywords: string[];
          name: string; // First Last
          native: string; // Native Emoji
          shortcodes: string; // :snake_case:
          unified: string;
        }) => {
          // TODO: emoji-martがemoji@15.0に対応していないため、一部画像が取得できない
          // https://github.com/missive/emoji-mart/pull/844
          // 使用する絵文字の画像のバージョン（Microsoft Teams）とemoji data sourceのバージョンを14.0に下げれば対応可能
          const url = await getEmojiImageUrl(emojiData.native);
          setImageUrl(url);
        }}
      />
    </>
  );
};
