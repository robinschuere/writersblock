import i18next from 'i18next';
import {
  en,
  nl,
} from './locales';

i18next
  .init({
    lng: 'en',
    debug: true,
    resources: {
      en: {
        translation: en,
      },
      nl: {
        translation: nl,
      },
    },
    fallbackLng: 'en',
  });

export default i18next;
