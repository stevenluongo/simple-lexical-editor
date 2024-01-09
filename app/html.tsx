"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useState } from "react";

export default function Html() {
  const [refresh, setRefresh] = useState(false);
  const [editor] = useLexicalComposerContext();

  const html = editor._editorState.read(() => {
    return $generateHtmlFromNodes(editor, null);
  });

  return (
    <>
      <button
        onClick={() => {
          setRefresh((prev) => !prev);
        }}
        className="bg-blue-500 text-white px-4 py-2 my-10 rounded-md"
      >
        Render HTML
      </button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
