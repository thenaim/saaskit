'use client';
import './styles.css';
import { forwardRef, HTMLProps, useEffect, useRef, useState } from 'react';

// @ts-ignore
import EditorJS, {
  API,
  BlockMutationEvent,
  OutputData,
} from '@editorjs/editorjs';
import { TOOLS } from './tools';
import { useEffectOnce } from 'react-use';

export const EditorInit = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & {
    initData: OutputData | undefined;
    onReady?: () => void;
    onChangeContent?: (
      api: API,
      event: BlockMutationEvent | BlockMutationEvent[],
    ) => void;
  }
>(({ initData, onReady, onChangeContent, ...props }, ref) => {
  const [editor, setEditor] = useState<EditorJS | null>(null);
  const isReady = useRef(false);

  useEffect(() => {
    if (!isReady.current && initData) {
      console.log('initData', initData);
      const init = new EditorJS({
        holder: 'editorjs',
        // inlineToolbar: ['link', 'marker', 'bold', 'italic'],
        placeholder: 'Type some content...',
        inlineToolbar: true,
        onReady: () => {
          setEditor(init);

          onReady && onReady();
        },
        autofocus: true,
        data: initData,
        onChange: async (api, event) => {
          onChangeContent && onChangeContent(api, event);
        },
        tools: TOOLS,
      });
      isReady.current = true;
    }
  }, [initData]);

  return <div ref={ref} {...props} id="editorjs"></div>;
});
