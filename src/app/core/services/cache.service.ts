import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private USER_KEY = "USER_KEY_LOCAL_STORAGE";

  constructor() { }

  saveUserData(user: User){
    localStorage.setItem(this.USER_KEY,JSON.stringify(user));
  }

  getUserData(): User | null {
    const data = localStorage.getItem(this.USER_KEY);
    if(data != undefined && data != null) return JSON.parse(data);
    return null
  } 

  clearUserData() {
    localStorage.removeItem(this.USER_KEY);
  }
}
