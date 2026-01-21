export const getJwtConfig = () => {
  return {
    secret: process.env.JWT_SECRET,
    accessTokenTtl: process.env.JWT_ACCESS_TOKE_TTL,
  };
};
