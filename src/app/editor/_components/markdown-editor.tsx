"use client";

import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Stack,
  Switch,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  IconAsterisk,
  IconBlockquote,
  IconH1,
  IconH2,
  IconH3,
  IconLink,
  IconList,
  IconListNumbers,
  IconStrikethrough,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import { DiaryArgs, createDiary } from "./actions";
import { EmojiPicker } from "./emoji-picker";
import { notifications } from "@mantine/notifications";

const TITLE_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 150;

export const MarkdownEditor = () => {
  const [emoji, setEmoji] = useState({
    native: "",
    url: "",
  });
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm<Omit<DiaryArgs, "emoji">>({
    initialValues: {
      title: "",
      description: "",
      body: "",
      isPublished: true,
      createdAt: new Date(),
    },
    validate: {
      title: (value) => {
        if (value.length < 2) {
          return "タイトルは2文字以上で入力してください";
        }
        return null;
      },
      description: (value) => {
        if (value.length < 2) {
          return "説明は2文字以上で入力してください";
        }
        return null;
      },
      body: (value) => {
        if (value.length < 2) {
          return "本文は2文字以上で入力してください";
        }
        return null;
      },
      createdAt: (value) => {
        if (!value) {
          return "作成日を入力してください";
        }
        return null;
      },
    },
  });

  const { title, description } = form.values;

  const handleSubmit = form.onSubmit(async (values) => {
    const errMsg = await createDiary({ ...values, emoji: emoji.native });
    if (errMsg) {
      notifications.show({
        title: "Error",
        message: errMsg,
        color: "red",
      });
      return;
    }
    notifications.show({
      title: "Success",
      message: "日記を作成しました",
      color: "teal",
    });
  });

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <EmojiPicker emoji={emoji} setEmoji={setEmoji} />
        <Stack gap={"md"}>
          <TextInput
            label="タイトル"
            maxLength={TITLE_MAX_LENGTH}
            description={`${title.length}/${TITLE_MAX_LENGTH} 文字`}
            autoFocus
            {...form.getInputProps("title")}
          />
          <Textarea
            maxLength={DESCRIPTION_MAX_LENGTH}
            label="説明"
            description={`${description.length}/${DESCRIPTION_MAX_LENGTH} 文字`}
            {...form.getInputProps("description")}
          />

          <Box>
            <Text size={"sm"}>本文</Text>
            <Flex mb={"sm"} gap={"sm"}>
              {/* Headings */}
              <ActionIcon.Group>
                <ActionIcon
                  variant="default"
                  size={"md"}
                  onClick={() => {
                    form.setValues((prev) => ({
                      ...prev,
                      body: `${prev.body}# `,
                    }));
                    bodyRef.current?.focus();
                  }}
                >
                  <IconH1 style={{ width: "70%", height: "70%" }} />
                </ActionIcon>
                <ActionIcon
                  variant="default"
                  size={"md"}
                  onClick={() => {
                    form.setValues((prev) => ({
                      ...prev,
                      body: `${prev.body}\n## `,
                    }));
                    bodyRef.current?.focus();
                  }}
                >
                  <IconH2 style={{ width: "70%", height: "70%" }} />
                </ActionIcon>
                <ActionIcon
                  variant="default"
                  size={"md"}
                  onClick={() => {
                    form.setValues((prev) => ({
                      ...prev,
                      body: `${prev.body}\n### `,
                    }));
                    bodyRef.current?.focus();
                  }}
                >
                  <IconH3 style={{ width: "70%", height: "70%" }} />
                </ActionIcon>
              </ActionIcon.Group>

              {/* Text Styles */}
              <ActionIcon.Group>
                <ActionIcon
                  variant="default"
                  size={"md"}
                  onClick={() => {
                    form.setValues((prev) => ({
                      ...prev,
                      body: `${prev.body}*`,
                    }));
                    bodyRef.current?.focus();
                  }}
                >
                  <IconAsterisk style={{ width: "70%", height: "70%" }} />
                </ActionIcon>

                <ActionIcon
                  variant="default"
                  size={"md"}
                  onClick={() => {
                    form.setValues((prev) => ({
                      ...prev,
                      body: `${prev.body}~~~~`,
                    }));
                    bodyRef.current?.focus();
                  }}
                >
                  <IconStrikethrough style={{ width: "70%", height: "70%" }} />
                </ActionIcon>

                <ActionIcon
                  variant="default"
                  size={"md"}
                  onClick={() => {
                    form.setValues((prev) => ({
                      ...prev,
                      body: `${prev.body}[text](url)`,
                    }));
                    bodyRef.current?.focus();
                  }}
                >
                  <IconLink style={{ width: "70%", height: "70%" }} />
                </ActionIcon>
              </ActionIcon.Group>

              {/* Others */}
              <ActionIcon.Group>
                <ActionIcon
                  variant="default"
                  size={"md"}
                  onClick={() => {
                    form.setValues((prev) => ({
                      ...prev,
                      body: `${prev.body}\n> `,
                    }));
                    bodyRef.current?.focus();
                  }}
                >
                  <IconBlockquote style={{ width: "70%", height: "70%" }} />
                </ActionIcon>

                <ActionIcon
                  variant="default"
                  size={"md"}
                  onClick={() => {
                    form.setValues((prev) => ({
                      ...prev,
                      body: `${prev.body}\n- `,
                    }));
                    bodyRef.current?.focus();
                  }}
                >
                  <IconList style={{ width: "70%", height: "70%" }} />
                </ActionIcon>

                <ActionIcon
                  variant="default"
                  size={"md"}
                  onClick={() => {
                    form.setValues((prev) => ({
                      ...prev,
                      body: `${prev.body}\n1. `,
                    }));
                    bodyRef.current?.focus();
                  }}
                >
                  <IconListNumbers style={{ width: "70%", height: "70%" }} />
                </ActionIcon>
              </ActionIcon.Group>
            </Flex>
            <Textarea
              ref={bodyRef}
              rows={10}
              {...form.getInputProps("body")}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     // 最後の行を取得
              //     const bodyLastLine = body.split("\n").slice(-1)[0];

              //     // List
              //     if (bodyLastLine.startsWith("- ")) {
              //       if (bodyLastLine === "- ") {
              //         setBody((prev) => prev.slice(0, -3)); // 末尾の改行も削除
              //         return;
              //       }
              //       setBody((prev) => `${prev}\n- `);
              //       e.preventDefault();
              //     }

              //     // Number List
              //     const number = Number(bodyLastLine.split(".")[0]);
              //     if (bodyLastLine.startsWith(`${number}. `)) {
              //       // NOTE: 数字とピリオドで終わりたい場合に困るのでやめる
              //       // if (bodyLastLine === `${number}. `) {
              //       //   const numStr = number.toString();
              //       //   setBody((prev) => prev.slice(0, -3 - numStr.length)); // 末尾の改行も削除
              //       //   return;
              //       // }
              //       setBody((prev) => `${prev}\n${number + 1}. `);
              //       e.preventDefault();
              //     }
              //   }
              // }}
            />
          </Box>

          <Box>
            <DateInput
              getDayProps={(date) => {
                if (date.getDay() !== 6) return {};
                return {
                  style: (theme) => ({
                    color: theme.colors.blue[6],
                  }),
                };
              }}
              label="作成日"
              {...form.getInputProps("createdAt")}
            />
          </Box>
          <Box>
            <Switch
              styles={{
                label: {
                  cursor: "pointer",
                },
                track: {
                  cursor: "pointer",
                },
              }}
              color="green"
              label="公開する"
              {...form.getInputProps("isPublished", { type: "checkbox" })}
            />
          </Box>

          <Button type="submit">Save</Button>
        </Stack>
      </form>
    </Box>
  );
};
