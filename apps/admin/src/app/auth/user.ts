import { Roles } from './roles.enum';

export interface userData {
    email: string;
    id: string;
    first_name: string;
    last_name: string;
    role: Roles;
    token: string;
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
        private _token: string,
        private _tokenExp: Date
      ) {}
  
      get token() {
        return this._token;
      }

      get tokenExp() {
        return this._tokenExp;
      }
}