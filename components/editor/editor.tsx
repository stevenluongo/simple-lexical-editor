import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import useLexicalEditable from "@lexical/react/useLexicalEditable";
import * as React from "react";
import { useEffect, useState } from "react";
import { CAN_USE_DOM } from "@/components/editor/shared/canUseDOM";
import { useSharedHistoryContext } from "@/components/editor/context/SharedHistoryContext";
import ActionsPlugin from "@/components/editor/plugins/ActionsPlugin";
import AutoEmbedPlugin from "@/components/editor/plugins/AutoEmbedPlugin";
import AutoLinkPlugin from "@/components/editor/plugins/AutoLinkPlugin";
import CodeActionMenuPlugin from "@/components/editor/plugins/CodeActionMenuPlugin";
import CodeHighlightPlugin from "@/components/editor/plugins/CodeHighlightPlugin";
import CollapsiblePlugin from "@/components/editor/plugins/CollapsiblePlugin";
import ComponentPickerPlugin from "@/components/editor/plugins/ComponentPickerPlugin";
import DragDropPaste from "@/components/editor/plugins/DragDropPastePlugin";
import DraggableBlockPlugin from "@/components/editor/plugins/DraggableBlockPlugin";
import FloatingLinkEditorPlugin from "@/components/editor/plugins/FloatingLinkEditorPlugin";
import ImagesPlugin from "@/components/editor/plugins/ImagesPlugin";
import InlineImagePlugin from "@/components/editor/plugins/InlineImagePlugin";
import KeywordsPlugin from "@/components/editor/plugins/KeywordsPlugin";
import { LayoutPlugin } from "@/components/editor/plugins/LayoutPlugin/LayoutPlugin";
import LinkPlugin from "@/components/editor/plugins/LinkPlugin";
import ListMaxIndentLevelPlugin from "@/components/editor/plugins/ListMaxIndentLevelPlugin";
import MentionsPlugin from "@/components/editor/plugins/MentionsPlugin";
import TabFocusPlugin from "@/components/editor/plugins/TabFocusPlugin";
import TableCellActionMenuPlugin from "@/components/editor/plugins/TableActionMenuPlugin";
import TableCellResizer from "@/components/editor/plugins/TableCellResizer";
import ToolbarPlugin from "@/components/editor/plugins/ToolbarPlugin";
import TwitterPlugin from "@/components/editor/plugins/TwitterPlugin";
import YouTubePlugin from "@/components/editor/plugins/YouTubePlugin";
import ContentEditable from "@/components/editor/ui/ContentEditable";
import Placeholder from "@/components/editor/ui/Placeholder";

export default function Editor(): JSX.Element {
  const { historyState } = useSharedHistoryContext();

  const isEditable = useLexicalEditable();
  const text = "Enter some rich text...";
  const placeholder = <Placeholder>{text}</Placeholder>;
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  return (
    <>
      <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
      <div className="editor-container">
        <DragDropPaste />
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <AutoEmbedPlugin />

        <MentionsPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        <AutoLinkPlugin />

        <HistoryPlugin externalHistoryState={historyState} />
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable />
              </div>
            </div>
          }
          placeholder={placeholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <CodeHighlightPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        <TablePlugin hasCellMerge={true} hasCellBackgroundColor={true} />
        <TableCellResizer />
        <ImagesPlugin />
        <InlineImagePlugin />
        <LinkPlugin />
        <TwitterPlugin />
        <YouTubePlugin />
        {!isEditable && <LexicalClickableLinkPlugin />}
        <HorizontalRulePlugin />
        <TabFocusPlugin />
        <TabIndentationPlugin />
        <CollapsiblePlugin />
        <LayoutPlugin />
        {floatingAnchorElem && !isSmallWidthViewport && (
          <>
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
            <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
            <FloatingLinkEditorPlugin
              anchorElem={floatingAnchorElem}
              isLinkEditMode={isLinkEditMode}
              setIsLinkEditMode={setIsLinkEditMode}
            />
            <TableCellActionMenuPlugin
              anchorElem={floatingAnchorElem}
              cellMerge={true}
            />
          </>
        )}

        <ActionsPlugin isRichText={true} />
      </div>
    </>
  );
}
