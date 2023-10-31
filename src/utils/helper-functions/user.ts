import {
  CUSTOMER_SESSION_TOKEN,
  NO_TOKEN_FOUND,
} from '../../constants/intakeConstants';

export const emailVerifier = (emailId: string): boolean => {
  return /\S+@\S+\.\S+/.test(emailId);
};

export const getLocalStorageItem = (keyName: string) => {
  return window.localStorage.getItem(keyName);
};

export const tokenValidator = () => {
  const tokenValid = getLocalStorageItem(CUSTOMER_SESSION_TOKEN);
  if (!tokenValid) {
    throw new Error(NO_TOKEN_FOUND);
  }
};

export const setLocalStorageItem = (keyName: string, value: string) => {
  window.localStorage.setItem(keyName, value);
};

export const deleteLocalStorageItem = (keyName: string) => {
  return window.localStorage.removeItem(keyName);
};
