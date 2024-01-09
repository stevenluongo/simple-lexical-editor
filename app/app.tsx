"use client";

import Editor from "@/components/editor/editor";
import Html from "./html";
import LexicalProvider from "./lexical-provider";

export default function LexicalEditor(): JSX.Element {
  return (
    <LexicalProvider>
      <>
        <div className="editor-shell shadow-md">
          <Editor />
        </div>

        <div>
          <Html />
        </div>
      </>
    </LexicalProvider>
  );
}
