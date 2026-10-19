import { useEffect, useRef, useState } from 'react'
import { useScrollEdges } from './useScrollEdges'
import './ScrollShadows.css'

/*
  Scroll shadows (step 4 review R12; every scrolling panel, R19). A soft shade on the top and bottom
  edges of a scrolling area while there's more to scroll that way; each fades out at its end
  (macOS hides scrollbars, so lists didn't look scrollable).

  Put it inside the panel's frame, beside the part that scrolls, and name that part with a selector:
    <div className="panel">               ← the frame: positioned, the scroller fills it
      <ul className="panel__list">…</ul>
      <ScrollShadows scroller=".panel__list" />
    </div>
  The shades sit over the frame's padding box; where the scroller has its own border, move them
  inside it with --scroll-shadows-inset-top / -bottom / -x. Decorative: hidden from screen readers.
*/
export function ScrollShadows({ scroller }: { scroller: string }) {
  const topRef = useRef<HTMLSpanElement>(null)
  const [element, setElement] = useState<HTMLElement | null>(null)

  // Find the scroller in the frame, again whenever the frame's children change (a list that
  // mounts only once it has items, like step 1's vendor grid).
  useEffect(() => {
    const frame = topRef.current?.parentElement
    if (!frame) return
    const find = () => setElement(frame.querySelector<HTMLElement>(scroller))
    find()
    const observer = new MutationObserver(find)
    observer.observe(frame, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [scroller])

  const edges = useScrollEdges(element)
  return (
    <>
      <span ref={topRef} className="scroll-shadows__edge scroll-shadows__edge--top" data-visible={edges.top || undefined} aria-hidden="true" />
      <span className="scroll-shadows__edge scroll-shadows__edge--bottom" data-visible={edges.bottom || undefined} aria-hidden="true" />
    </>
  )
}
