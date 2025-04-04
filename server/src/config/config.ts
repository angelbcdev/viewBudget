process.env.NODE_ENV = "production";

const config = {
  serverUrl:
    process.env.NODE_ENV == "production"
      ? process.env.VITE_API_URL_PROD
      : process.env.VITE_API_URL_DEV,
};

export default config;
