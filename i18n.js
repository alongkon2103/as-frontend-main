import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from "./public/locales/en/translation.json";
import translationTH from "./public/locales/th/translation.json";

const resources = {
    en: {
        translation: translationEN
    },
    th: {
        translation: translationTH
    }
};


i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    locales: ['en', 'th'],
    default: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;