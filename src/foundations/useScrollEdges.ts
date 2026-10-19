import { useEffect, useState } from 'react'

const NONE = { top: false, bottom: false }

/*
  Whether a scrolling box has more above and below (scroll shadows: ScrollShadows.tsx).
  Rechecks on scroll, when the box resizes, and when its content changes size (a row removed,
  a group opened), since the box itself can keep its size while its content shrinks.
*/
export function useScrollEdges(box: HTMLElement | null) {
  const [edges, setEdges] = useState({ top: false, bottom: false })

  useEffect(() => {
    if (!box) return
    const update = () => {
      // 1px of slack: zoomed pages report fractional scroll positions.
      const top = box.scrollTop > 1
      const bottom = box.scrollTop + box.clientHeight < box.scrollHeight - 1
      setEdges((prev) => (prev.top === top && prev.bottom === bottom ? prev : { top, bottom }))
    }
    update()
    box.addEventListener('scroll', update, { passive: true })
    const resize = new ResizeObserver(update)
    const observeAll = () => {
      resize.observe(box)
      for (const child of box.children) resize.observe(child)
    }
    observeAll()
    const mutation = new MutationObserver(() => {
      observeAll()
      update()
    })
    mutation.observe(box, { childList: true, subtree: true })
    return () => {
      box.removeEventListener('scroll', update)
      resize.disconnect()
      mutation.disconnect()
    }
  }, [box])

  // No box (a list not mounted yet): nothing to scroll.
  return box ? edges : NONE
}
