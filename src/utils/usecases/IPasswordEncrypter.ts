export type passwordEncrypterData = {
  password: string;
  salt?: number;
};

export type passwordComparerData = {
  password: string;
  encryptedPassword: string;
};

export interface IPasswordEncrypter {
  encrypt: (data: passwordEncrypterData) => Promise<string>;
  comparePassword: (data: passwordComparerData) => Promise<boolean>;
}
