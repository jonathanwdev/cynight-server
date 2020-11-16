export type IUser = {
  id: string;
  name: string;
  nick: string;
  email: string;
  isInfluencer: boolean;
  password: string;
  avatar?: string;
  meInTheNight?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};
