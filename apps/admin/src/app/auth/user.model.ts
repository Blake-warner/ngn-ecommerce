import { Roles } from './roles.enum';

export class User {
    constructor(
        public email: string,
        public id: string,
        public firstname: string,
        public lastname: string,
        public role: Roles,
        private _token: string,
        private _tokenExpirationDate: Date
      ) {}
    
      get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
          return null;
        }
        return this._token;
      }
}