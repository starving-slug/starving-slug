import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private token_key = '.starving.slug';

  constructor() {}

  saveToken(value: any) {
    localStorage.setItem(this.token_key, value)
  }

  getTokenString() {
    return localStorage.getItem(this.token_key);
  }
}
