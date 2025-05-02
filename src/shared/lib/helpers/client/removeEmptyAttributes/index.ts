// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeEmptyAttributes = (params: any) => {
  const queryString = Object?.entries(params)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return queryString;
};
