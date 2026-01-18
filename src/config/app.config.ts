export const getAppConfig = () => {
  return {
    port: +(process.env.APP_PORT ?? 8080),
  };
};
