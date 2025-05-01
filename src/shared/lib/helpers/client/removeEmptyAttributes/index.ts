export const removeEmptyAttributes = (params: any) => {
  const queryString = Object?.entries(params)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return queryString;
};
