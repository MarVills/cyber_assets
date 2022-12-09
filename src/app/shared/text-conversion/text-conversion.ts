import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class TextConversion {
  plainText!: string;
  encryptText!: string;
  encPassword!: string;
  decPassword!: string;

  encryptDecrypt(conversion: string): string {
    if (conversion == 'encrypt') {
      return CryptoJS.AES.encrypt(
        this.plainText.trim(),
        this.encPassword.trim()
      ).toString();
    } else {
      return CryptoJS.AES.decrypt(
        this.encryptText.trim(),
        this.decPassword.trim()
      ).toString(CryptoJS.enc.Utf8);
    }
  }
}
