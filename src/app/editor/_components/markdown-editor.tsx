"use client";

import { Textarea } from "@mantine/core";
import { ChangeEventHandler, useState } from "react";

export const MarkdownEditor = () => {
  const [value, setValue] = useState("");

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setValue(event.target.value);
  };

  return (
    <Textarea rows={10} onChange={handleChange} value={value}>
      {value}
    </Textarea>
  );
};
