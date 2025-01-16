'use client';

import i18n from 'i18next';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(ChainedBackend)
  .use(initReactI18next)
  .init({
    lng: 'de',
    fallbackLng: 'de',
    defaultNS: 'translation_external', // use external translations to override
    fallbackNS: 'translation',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    backend: {
      backends: [
        resourcesToBackend(
          (lng: string, ns: string) => import(`./locales/${lng}/${ns}.json`),
        ),
        HttpBackend,
      ],
    },

    supportedLngs: ['en', 'de'],
  });

export default i18n;
