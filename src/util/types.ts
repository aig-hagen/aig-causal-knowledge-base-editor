export function hasMoreThenOneEntry<T>(array: T[]): array is [T, T, ...T[]] & [...T[], T, T] {
  return array.length > 1
}

export function hasOneOrMoreEntries<T>(array: T[]): array is [T, ...T[]] & [...T[], T] {
  return array.length > 0
}

export function hasOneEntry<T>(array: T[]): array is [T] {
  return array.length == 1
}
