import { atom } from 'recoil';

const isWorkingState = atom({
  key: 'isWorking',
  default: false,
});

export default isWorkingState;
