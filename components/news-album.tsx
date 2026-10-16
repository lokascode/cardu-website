'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

type NewsAlbumProps = {
  title: string
  imageUrls: string[]
}

export function NewsAlbum({ title, imageUrls }: NewsAlbumProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function move(direction: 'next' | 'previous') {
    scrollerRef.current?.scrollBy({
      left: direction === 'next' ? scrollerRef.current.clientWidth : -scrollerRef.current.clientWidth,
      behavior: 'smooth',
    })
  }

  return (
    <div className="relative">
      <div ref={scrollerRef} className="flex snap-x overflow-x-auto scrollbar-hide" aria-label={`${title} photo album`}>
        {imageUrls.map((imageUrl, index) => (
          <figure key={`${imageUrl}-${index}`} className="w-full shrink-0 snap-center">
            <Image
              src={imageUrl}
              alt={`${title} — photo ${index + 1}`}
              width={1600}
              height={900}
              className="aspect-[16/9] w-full object-cover"
              unoptimized
            />
          </figure>
        ))}
      </div>
      {imageUrls.length > 1 ? (
        <>
          <button type="button" onClick={() => move('previous')} aria-label="Previous photo" className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-3 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground">
            <ChevronLeft size={24} aria-hidden />
          </button>
          <button type="button" onClick={() => move('next')} aria-label="Next photo" className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-3 text-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground">
            <ChevronRight size={24} aria-hidden />
          </button>
        </>
      ) : null}
    </div>
  )
}
