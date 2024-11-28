import { ToolConstructable, ToolSettings } from '@editorjs/editorjs';

// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Warning from '@editorjs/warning';
// @ts-ignore
import Code from '@editorjs/code';
// @ts-ignore
import LinkTool from '@editorjs/link';
// @ts-ignore
import Image from '@editorjs/image';
// @ts-ignore
import Raw from '@editorjs/raw';
// @ts-ignore
import Quote from '@editorjs/quote';
// @ts-ignore
import Marker from '@editorjs/marker';
// @ts-ignore
import CheckList from '@editorjs/checklist';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';

export const TOOLS: {
  [toolName: string]: ToolConstructable | ToolSettings;
} = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  header: {
    // @ts-ignore
    class: Header,
    inlineToolbar: ['marker', 'link'],
    config: {
      placeholder: 'Header',
    },
    shortcut: 'CMD+SHIFT+H',
  },
  embed: Embed,
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
        byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
      },
    },
  },
  raw: Raw,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
};
