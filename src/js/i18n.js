import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import uniq from 'lodash/uniq';

async function createI18next(languages, preloadLanguages = false) {
  const detectorOptions = {
    lookupQuerystring: 'lang',
  };

  const httpBackendOptions = {
    loadPath: 'assets/locales/{{lng}}.json',
  };

  const i18nextOptions = {
    preload: preloadLanguages ? languages : false,
    fallbackLng: uniq([...languages, 'en']),
    cleanCode: true,
    detection: detectorOptions,
    backend: httpBackendOptions,
  };

  const newInstance = i18next.createInstance();
  await newInstance
    .use(LanguageDetector)
    .use(HttpBackend)
    .init(i18nextOptions);

  return newInstance;
}

export { createI18next as default };
