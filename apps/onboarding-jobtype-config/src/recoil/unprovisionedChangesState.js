import { atom } from 'recoil';

const unprovisionedChangesState = atom({
  key: 'areUnprovisionedChanges',
  default: false,
});

export default unprovisionedChangesState;
