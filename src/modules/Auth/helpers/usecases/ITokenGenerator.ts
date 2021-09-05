export type TokenGeneratorData = {
  userId: string;
  secret: string;
  expiresIn: string;
};

export interface ITokenGenerator {
  generate: (data: TokenGeneratorData) => string;
}
