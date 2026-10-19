import { useEffect, useState, type RefObject } from 'react'

/*
  Whether a scrolling box has more above and below (step 4 review R12, scroll shadows).
  Rechecks on scroll, when the box resizes, and when its content changes (a row removed).
*/
export function useScrollEdges(ref: RefObject<HTMLElement | null>) {
  const [edges, setEdges] = useState({ top: false, bottom: false })

  useEffect(() => {
    const box = ref.current
    if (!box) return
    const update = () => {
      // 1px of slack: zoomed pages report fractional scroll positions.
      const top = box.scrollTop > 1
      const bottom = box.scrollTop + box.clientHeight < box.scrollHeight - 1
      setEdges((prev) => (prev.top === top && prev.bottom === bottom ? prev : { top, bottom }))
    }
    update()
    box.addEventListener('scroll', update, { passive: true })
    // The box keeps its size while its content shrinks (a row animating out), so watch the children too.
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
    mutation.observe(box, { childList: true })
    return () => {
      box.removeEventListener('scroll', update)
      resize.disconnect()
      mutation.disconnect()
    }
  }, [ref])

  return edges
}
