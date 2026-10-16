'use client'

import { useCallback, useRef, useState, useEffect } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { Color, FontFamily, TextStyle } from '@tiptap/extension-text-style'
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Link2Off,
  ImageIcon,
  Undo2,
  Redo2,
  Minus,
  Code2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { uploadImage } from '@/lib/cms/upload'
import type { TiptapDoc } from '@/lib/cms/types'

type Props = {
  value?: TiptapDoc | null
  onChange: (doc: TiptapDoc) => void
  onUploadError?: (message: string) => void
  placeholder?: string
  dir?: 'ltr' | 'rtl'
}

const EMPTY_DOC: TiptapDoc = { type: 'doc', content: [{ type: 'paragraph' }] }

export function RichTextEditor({
  value,
  onChange,
  onUploadError,
  placeholder = 'Start writing the investigation…',
  dir = 'ltr',
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: 'noopener noreferrer nofollow' },
      }),
      Image.configure({ HTMLAttributes: { class: 'editor-image' } }),
      Placeholder.configure({ placeholder }),
      TextStyle,
      Color,
      FontFamily,
    ],
    content: value && Object.keys(value).length ? value : EMPTY_DOC,
    editorProps: {
      attributes: {
        class:
          'prose-editor min-h-[420px] max-w-none px-5 py-4 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON() as TiptapDoc)
    },
  })

  // Sync external value changes (e.g. switching the active locale tab).
  useEffect(() => {
    if (!editor) return
    const incoming = value && Object.keys(value).length ? value : EMPTY_DOC
    const current = editor.getJSON()
    if (JSON.stringify(current) !== JSON.stringify(incoming)) {
      editor.commands.setContent(incoming, { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor])

  const handlePickImage = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      e.target.value = '' // allow re-selecting the same file
      if (!file || !editor) return
      setUploading(true)
      try {
        const url = await uploadImage(file, 'article-images')
        editor.chain().focus().setImage({ src: url }).run()
      } catch (err) {
        onUploadError?.(
          err instanceof Error ? err.message : 'Image upload failed.',
        )
      } finally {
        setUploading(false)
      }
    },
    [editor, onUploadError],
  )

  const setLink = useCallback(() => {
    if (!editor) return
    const previous = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('Enter URL', previous ?? 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run()
  }, [editor])

  if (!editor) {
    return (
      <div className="min-h-[480px] border border-border bg-muted/40" aria-hidden />
    )
  }

  return (
    <div className="border border-border bg-background">
      <Toolbar
        editor={editor}
        onImage={handlePickImage}
        onLink={setLink}
        uploading={uploading}
      />
      <EditorContent editor={editor} dir={dir} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  )
}

function Toolbar({
  editor,
  onImage,
  onLink,
  uploading,
}: {
  editor: Editor
  onImage: () => void
  onLink: () => void
  uploading: boolean
}) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/40 px-2 py-2">
      <Btn
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
        label="Bold"
      >
        <Bold className="h-4 w-4" />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
        label="Italic"
      >
        <Italic className="h-4 w-4" />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
        label="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
        label="Inline code"
      >
        <Code2 className="h-4 w-4" />
      </Btn>
      <select
        aria-label="Font family"
        defaultValue=""
        onChange={(event) => {
          const family = event.target.value
          const chain = editor.chain().focus()
          if (family) chain.setFontFamily(family).run()
          else chain.unsetFontFamily().run()
        }}
        className="h-8 border border-border bg-background px-2 text-xs text-foreground"
      >
        <option value="">Font</option>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Mono</option>
      </select>
      <select
        aria-label="Font size"
        defaultValue=""
        onChange={(event) => {
          const size = event.target.value
          const chain = editor.chain().focus()
          if (size) chain.setMark('textStyle', { fontSize: size }).run()
          else chain.unsetMark('textStyle').run()
        }}
        className="h-8 border border-border bg-background px-2 text-xs text-foreground"
      >
        <option value="">Size</option>
        <option value="14px">Small</option>
        <option value="18px">Normal</option>
        <option value="24px">Large</option>
        <option value="32px">XL</option>
      </select>
      <label className="flex h-8 items-center gap-1 border border-border bg-background px-2 text-xs text-foreground" title="Text color">
        <span className="sr-only">Text color</span>
        <input
          type="color"
          defaultValue="#111111"
          onChange={(event) => editor.chain().focus().setColor(event.target.value).run()}
          className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
        />
      </label>
      <Divider />
      <Btn
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
        active={editor.isActive('heading', { level: 2 })}
        label="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Btn>
      <Btn
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
        active={editor.isActive('heading', { level: 3 })}
        label="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Btn>
      <Divider />
      <Btn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
        label="Bullet list"
      >
        <List className="h-4 w-4" />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
        label="Numbered list"
      >
        <ListOrdered className="h-4 w-4" />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
        label="Quote"
      >
        <Quote className="h-4 w-4" />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        label="Divider"
      >
        <Minus className="h-4 w-4" />
      </Btn>
      <Divider />
      <Btn onClick={onLink} active={editor.isActive('link')} label="Add link">
        <Link2 className="h-4 w-4" />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
        label="Remove link"
      >
        <Link2Off className="h-4 w-4" />
      </Btn>
      <Btn onClick={onImage} disabled={uploading} label="Insert image">
        <ImageIcon className="h-4 w-4" />
        {uploading ? (
          <span className="ml-1 font-mono text-[10px] uppercase">…</span>
        ) : null}
      </Btn>
      <Divider />
      <Btn
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        label="Undo"
      >
        <Undo2 className="h-4 w-4" />
      </Btn>
      <Btn
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        label="Redo"
      >
        <Redo2 className="h-4 w-4" />
      </Btn>
    </div>
  )
}

function Btn({
  children,
  onClick,
  active,
  disabled,
  label,
}: {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  disabled?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={cn(
        'flex h-8 min-w-8 items-center justify-center px-1.5 text-foreground transition-colors',
        active
          ? 'bg-foreground text-background'
          : 'hover:bg-border/60 disabled:opacity-30 disabled:hover:bg-transparent',
      )}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-border" aria-hidden />
}
