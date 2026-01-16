import * as CodePoint from '@/misc/CodePoint'

export function getNextName(names: string[]) {
  let codePointNextName = CodePoint.a

  for (const name of names) {
    if (name.length != 1) {
      continue
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const codePointNameChar = name.codePointAt(0)!
    if (codePointNameChar < codePointNextName) {
      continue
    }
    if (codePointNameChar === CodePoint.z) {
      return ''
    }
    if (codePointNameChar < CodePoint.z) {
      codePointNextName = codePointNameChar + 1
    }
  }
  return String.fromCodePoint(codePointNextName)
}
