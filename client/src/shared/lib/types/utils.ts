export function hasProp<K extends PropertyKey>(data: unknown, prop: K): data is Record<K, unknown> {
  return Boolean(data && typeof data === 'object' && prop in data);
}
