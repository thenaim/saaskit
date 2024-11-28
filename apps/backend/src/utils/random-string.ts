import { randomBytes } from 'node:crypto';

const randomString = (length: number) => {
  if (length % 2 !== 0) {
    length++;
  }

  return randomBytes(length / 2).toString('hex');
};

export default randomString;
