'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start typing...',
  maxLength = 1000,
  className,
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      
      // Limit by text length (not HTML)
      if (text.length <= maxLength) {
        onChange(html);
      } else {
        // Truncate if exceeds max length
        const truncated = text.substring(0, maxLength);
        editor.commands.setContent(truncated);
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[150px] p-4',
          className
        ),
      },
    },
  });

  // Sync editor content when content prop changes externally
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '');
    }
  }, [content, editor]);

  // Don't render until mounted on client
  if (!isMounted || !editor) {
    return (
      <div className="border rounded-md min-h-[150px] p-4">
        <div className="flex items-center gap-1 p-2 border-b bg-muted/50">
          <div className="ml-auto text-xs text-muted-foreground">Loading editor...</div>
        </div>
        <div className="p-4 text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const characterCount = editor.getText().length;
  const remaining = maxLength - characterCount;

  return (
    <div className="border rounded-md">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-muted/50">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={cn(
            'size-8',
            editor.isActive('bold') && 'bg-background'
          )}
          aria-label="Bold"
        >
          <Bold className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={cn(
            'size-8',
            editor.isActive('italic') && 'bg-background'
          )}
          aria-label="Italic"
        >
          <Italic className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            'size-8',
            editor.isActive('bulletList') && 'bg-background'
          )}
          aria-label="Bullet List"
        >
          <List className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            'size-8',
            editor.isActive('orderedList') && 'bg-background'
          )}
          aria-label="Numbered List"
        >
          <ListOrdered className="size-4" />
        </Button>
        <div className="ml-auto text-xs text-muted-foreground">
          {characterCount} / {maxLength} characters
          {remaining < 50 && (
            <span className={cn('ml-1', remaining < 0 && 'text-destructive')}>
              ({remaining} remaining)
            </span>
          )}
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
