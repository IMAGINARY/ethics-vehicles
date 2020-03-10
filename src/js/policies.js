import { Texts } from "./texts";

// eslint-disable-next-line import/prefer-default-export
export const Policies = [
  { id: 'humanist', ...Texts.Humanist },
  { id: 'profit', ...Texts.Profit },
  { id: 'protector', ...Texts.Protector },
];
