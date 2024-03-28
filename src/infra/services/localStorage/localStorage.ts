const cookieConsent = 'cookieConsent';

export const saveCookieConsent = (value: boolean) => {
  localStorage.setItem(cookieConsent, value.toString());
};

export const getCookieConsent = () => {
  const result = localStorage.getItem(cookieConsent);
  return result === 'true';
};
