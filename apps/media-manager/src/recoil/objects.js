import { atom } from 'recoil';

export const uncommittedState = atom({
  key: 'uncommitted',
  default: [],
});

export const unsortedState = atom({
  key: 'unsorted',
  default: [],
});
