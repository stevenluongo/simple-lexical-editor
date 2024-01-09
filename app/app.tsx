"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { SharedHistoryContext } from "@/components/editor/context/SharedHistoryContext";
import PlaygroundNodes from "@/components/editor/nodes/PlaygroundNodes";
import { TableContext } from "@/components/editor/plugins/TablePlugin";
import PlaygroundEditorTheme from "@/components/editor/themes/PlaygroundEditorTheme";
import Editor from "@/components/editor/editor";
import { getPrepopulatedRichText } from "@/components/editor/utils/getPrepopulatedRichText";
import Html from "./html";

export default function LexicalEditor(): JSX.Element {
  const initialConfig = {
    editorState: getPrepopulatedRichText,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <>
            <div className="editor-shell shadow-md">
              <Editor />
            </div>

            <div>
              <Html />
            </div>
          </>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}
