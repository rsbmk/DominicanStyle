export const isEmpty = (value: unknown) => {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value === 'string') {
    return value.length === 0
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  if (typeof value === 'boolean') {
    return !value
  }

  return true
}
