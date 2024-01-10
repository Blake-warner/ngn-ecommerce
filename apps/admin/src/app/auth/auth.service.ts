import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CONSTANTS from '../shared/constants';
//import { User } from './user.model';

export interface authUser {
  email: string;
  id: string; 
  token: string;
  tokenExp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(data: unknown) {;
    return this.http.post<authUser>(CONSTANTS.SIGNUP_ENDPOINT, data);
  }

  verifyEmail(email: string) {
    const payload = {email};
    return this.http.post(CONSTANTS.VERIFY_EMAIL_ENDPOINT, payload);
  }

  emailVerified(email: string, code: number) {
    return this.http.get(CONSTANTS.EMAIL_VERIFIED_ENDPOINT+'?email='+email+'&code='+code);
  }
} 
