export const parseJSON = (data) => {
  return Object.entries(data).map(([key, value]) => {
    return {
      ...value,
      id: key,
    }
  })
}