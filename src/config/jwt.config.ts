export const getJwtConfig = () => {
  return {
    secret: process.env.JWT_SECRET as string,
    accessTokenTtl: +(process.env.JWT_ACCESS_TOKE_TTL ?? 3600),
  };
};
