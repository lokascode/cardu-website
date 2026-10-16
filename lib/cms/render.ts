import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import type { TiptapDoc } from './types'

const extensions = [
  StarterKit.configure({ heading: { levels: [2, 3] } }),
  Link.configure({ HTMLAttributes: { rel: 'noopener noreferrer nofollow' } }),
  Image,
]

/**
 * Convert stored Tiptap document JSON into an HTML string for rendering on the
 * public site. Returns an empty string for empty/invalid docs.
 */
export function renderTiptap(doc: TiptapDoc | null | undefined): string {
  if (!doc || typeof doc !== 'object' || !('type' in doc)) return ''
  const content = (doc as { content?: unknown[] }).content
  if (!content || content.length === 0) return ''
  try {
    return generateHTML(doc as Parameters<typeof generateHTML>[0], extensions)
  } catch (err) {
    console.log('[v0] renderTiptap error:', (err as Error).message)
    return ''
  }
}

/** True when a Tiptap doc has meaningful content. */
export function hasContent(doc: TiptapDoc | null | undefined): boolean {
  if (!doc || typeof doc !== 'object') return false
  const content = (doc as { content?: unknown[] }).content
  if (!content || content.length === 0) return false
  // A single empty paragraph counts as empty.
  if (content.length === 1) {
    const only = content[0] as { type?: string; content?: unknown[] }
    if (only.type === 'paragraph' && !only.content?.length) return false
  }
  return true
}
