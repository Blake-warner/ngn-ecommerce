import { Roles } from './roles.enum';

export interface userData {
    email: string;
    id: string;
    token: string;
    tokenExp: Date;
}
  
export interface tempUserData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: Roles;
}

export class User {
    constructor(
        public email: string,
        public id: string,
        public first_name: string,
        public last_name: string,
        public role: Roles,
        readonly _tokenExp: Date,
        readonly token: string,
      ) {}
}