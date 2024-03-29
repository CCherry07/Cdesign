export const isVoid = (value: unknown) => value === (undefined || null || "") ? true : false
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

export const clearObject = (target: Record<string, unknown>) => {
  const resObj = { ...target }
  Object.keys(resObj).forEach((key: string) => {
    if (isVoid(resObj[key])) {
      delete resObj[key]
    }
  })
  return resObj
}
