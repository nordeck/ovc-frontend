'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-http-backend";

import translationEn from './src/locales/en/translation.json';
import translationDe from "./src/locales/de/translation.json";

const resource = {
    en: {
        translation: translationEn,
    },
    de: {
        translation: translationDe,
    },
};

i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'de',
        detection: {
            order: ['querystring', 'navigator'],
            lookupQuerystring: 'lng',
        },
        resources: resource,
        debug: process.env.NODE_ENV === 'development',

        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
  });

export default i18n;