export const getEnumKey = (object: any, value: number | string) => {
  const result = Object.keys(object).find((key) => object[key] === value);

  if (result === 'Mid') return 'Mid-Level';

  return result;
};
