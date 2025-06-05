export const BASE_URL = import.meta.env.PROD ? '/CropGuard-AI' : '';

export const getAssetUrl = (path: string) => {
  return `${BASE_URL}${path}`;
}; 