export const config = {
  serverUrl:
    import.meta.env.VITE_NODE_ENV === "production"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV,
};
