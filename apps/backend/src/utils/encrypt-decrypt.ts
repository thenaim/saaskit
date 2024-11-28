import CryptoJS from 'crypto-js';
import { isEmpty, isString } from 'lodash';

export function encrypt(plainText: string, key: string): string {
  const encrypted = CryptoJS.AES.encrypt(plainText, key).toString();
  return encrypted;
}

export function decrypt(encryptedText: string, key: string): string {
  if (!isString(encryptedText) || isEmpty(encryptedText)) {
    return encryptedText;
  }

  const bytes = CryptoJS.AES.decrypt(encryptedText, key);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}
