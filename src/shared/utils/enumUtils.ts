export const getEnumKey = (object: any, value: number | string) => {
  return Object.keys(object).find((key) => object[key] === value);
};
