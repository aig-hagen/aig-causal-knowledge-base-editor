import type { Directive } from 'vue'

export const vFocus: Directive<HTMLElement> = {
  mounted(el) {
    // focusVisible is a non-standard option used for improved accessibility in some browsers.
    // @ts-expect-error Ignore TypeScript error about unknown property in FocusOptions.
    el.focus({ focusVisible: true })
  },
}
