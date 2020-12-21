export type Dictionary<T> = Record<string, T>

export type SelectItemKey = string | (string | number)[] | ((item: Dictionary<any>, fallback?: any) => any)

export type SetupProps = Record<string, any>

/* eslint-disable no-use-before-define */

export interface TouchHandlers {
  start?: (wrapperEvent: TouchEvent & TouchWrapper) => void
  end?: (wrapperEvent: TouchEvent & TouchWrapper) => void
  move?: (wrapperEvent: TouchEvent & TouchWrapper) => void
  left?: (wrapper: TouchWrapper) => void
  right?: (wrapper: TouchWrapper) => void
  up?: (wrapper: TouchWrapper) => void
  down?: (wrapper: TouchWrapper) => void
}

export interface TouchWrapper extends TouchHandlers {
  touchstartX: number
  touchstartY: number
  touchmoveX: number
  touchmoveY: number
  touchendX: number
  touchendY: number
  offsetX: number
  offsetY: number
}

export type TouchValue = TouchHandlers & {
  parent?: boolean
  options?: AddEventListenerOptions
}

export declare module 'uipart/directives' {
  // eslint-disable-next-line import/no-duplicates
  import { DirectiveOptions } from 'vue'

  const ClickOutside: DirectiveOptions
  const Intersect: DirectiveOptions
  const Mask: DirectiveOptions
  const Scroll: DirectiveOptions
  const Touch: DirectiveOptions

  export {
    ClickOutside,
    Intersect,
    Mask,
    Scroll,
    Touch,
  }
}

/* eslint-enable no-use-before-define */