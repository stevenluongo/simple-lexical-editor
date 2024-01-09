"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { SharedHistoryContext } from "@/components/editor/context/SharedHistoryContext";
import PlaygroundNodes from "@/components/editor/nodes/PlaygroundNodes";
import { TableContext } from "@/components/editor/plugins/TablePlugin";
import PlaygroundEditorTheme from "@/components/editor/themes/PlaygroundEditorTheme";
import { getPrepopulatedRichText } from "@/components/editor/utils/getPrepopulatedRichText";

export default function LexicalProvider({
  children,
}: {
  children: React.ReactElement;
}): JSX.Element {
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
        <TableContext>{children}</TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}
