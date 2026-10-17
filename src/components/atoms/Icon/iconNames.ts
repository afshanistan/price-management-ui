// The 21 icons from the Figma Icons set (design/specs/icon.md).
export const iconNames = [
  'tag',
  'create',
  'upload',
  'messages',
  'bookmark',
  'settings',
  'open-sidebar',
  'close-sidebar',
  'arrow-left',
  'arrow-right',
  'download',
  'placeholder',
  'help',
  'search',
  'check-circle',
  'alert-circle',
  'trash',
  'calendar',
  'chevron-left',
  'chevron-right',
  'close',
] as const

export type IconName = (typeof iconNames)[number]
export type IconSize = 14 | 16 | 20 | 24
