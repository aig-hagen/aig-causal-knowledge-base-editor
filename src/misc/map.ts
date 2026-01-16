export function getOrSet<KeyT, ValueT>(
  map: Map<KeyT, ValueT>,
  key: KeyT,
  defaultValueFacotry: () => ValueT,
): ValueT {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (map.has(key)) return map.get(key)!
  const defaultValue = defaultValueFacotry()
  map.set(key, defaultValue)
  return defaultValue
}
