"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ActionIcon, Box, Center, Modal, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowsExchange } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useState } from "react";

const PREVIEW_SIZE = 150;

type Emoji = {
  native: string;
  url: string;
};

type Props = {
  emoji: Emoji;
  setEmoji: Dispatch<SetStateAction<Emoji>>;
};

export const EmojiPicker = ({ emoji, setEmoji }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const [isLoading, setIsLoading] = useState(false);
  const handleEmojiSelect = async (emojiData: {
    id: string; // snakce_case
    keywords: string[];
    name: string; // First Last
    native: string; // Native Emoji
    shortcodes: string; // :snake_case:
    unified: string;
  }) => {
    close();
    setIsLoading(true);
    setEmoji({ native: "", url: "" });
    try {
      const res = await fetch("/api/emoji", {
        method: "POST",
        body: JSON.stringify({ emoji: emojiData.native }),
      });
      const data = (await res.json()) as { imageUrl: string };
      setEmoji({
        native: emojiData.native,
        url: data.imageUrl,
      });
    } catch (err) {
      console.error(err);
      setEmoji({
        native: emojiData.native,
        url: emojiData.native,
      });
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <Center
        my={"md"}
        onClick={open}
        style={{ cursor: "pointer", position: "relative" }}
      >
        <ActionIcon
          variant="default"
          size={"lg"}
          style={{
            position: "absolute",
            top: 0,
            right: PREVIEW_SIZE / 3,
            zIndex: 1,
          }}
          radius={"xl"}
        >
          <IconArrowsExchange />
        </ActionIcon>
        {emoji.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={emoji.url}
            alt={emoji.native}
            height={PREVIEW_SIZE}
            width={PREVIEW_SIZE}
            style={{
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        ) : (
          <Skeleton
            height={PREVIEW_SIZE}
            width={PREVIEW_SIZE}
            circle
            animate={isLoading}
          />
        )}
      </Center>

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        styles={{
          body: {
            padding: 0,
          },
        }}
        size={"auto"}
        centered
        lockScroll={false}
      >
        <Picker
          data={data}
          onEmojiSelect={handleEmojiSelect}
          // NOTE: 2023-11-23 現在、Fluent Emojiが国旗対応していないため、国旗は表示(選択)させない
          noCountryFlags
        />
      </Modal>
    </Box>
  );
};
