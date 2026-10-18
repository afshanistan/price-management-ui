import { useSyncExternalStore } from 'react'

/* True when motion should be reduced: the OS setting, or Storybook's Motion toolbar
   (data-motion="reduced" on <html>, the switch motion.css reads too). */
const query = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const media = window.matchMedia(query)
  media.addEventListener('change', onChange)
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] })
  return () => {
    media.removeEventListener('change', onChange)
    observer.disconnect()
  }
}

function isReduced() {
  return window.matchMedia(query).matches || document.documentElement.dataset.motion === 'reduced'
}

export function useReducedMotionSetting() {
  return useSyncExternalStore(subscribe, isReduced, () => false)
}
