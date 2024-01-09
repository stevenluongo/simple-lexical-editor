export const isDevPlayground: boolean = false;

export const DEFAULT_SETTINGS = {
  disableBeforeInput: false,
  emptyEditor: isDevPlayground,
  isCharLimit: false,
  isCharLimitUtf8: false,
  isMaxLength: false,
  isRichText: true,
  measureTypingPerf: false,
  shouldUseLexicalContextMenu: false,
  showTableOfContents: false,
  tableCellBackgroundColor: true,
  tableCellMerge: true,
};

export type SettingName = keyof typeof DEFAULT_SETTINGS;

export type Settings = typeof DEFAULT_SETTINGS;
