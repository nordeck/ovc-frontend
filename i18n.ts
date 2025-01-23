'use client';

import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

export default i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
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
      ],
    },

    supportedLngs: ['en', 'de'],
  });