import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import uniq from 'lodash/uniq';

function handleLoaded(lngs) {
  const langKeys = Object.keys(lngs);
  if (langKeys.length > 0) {
    // eslint-disable-next-line no-console
    console.log('Languages loaded:', ...langKeys);
  }
}

function handleFailedLoading(language, namespace, message) {
  const obj = {
    language,
    namespace,
    message,
  };
  // eslint-disable-next-line no-console
  console.error('Language loading failed:', obj);
}

function handleMissingKey(languages, namespace, key, resource) {
  const obj = {
    languages,
    namespace,
    key,
    resource,
  };
  // eslint-disable-next-line no-console
  console.error('Missing i18n key:', obj);
}

async function createI18next(languages, preloadLanguages = false) {
  const detectorOptions = {
    lookupQuerystring: 'lang',
  };

  const httpBackendOptions = {
    loadPath: 'assets/locales/{{lng}}.json',
  };

  const i18nextOptions = {
    preload: preloadLanguages ? languages : false,
    fallbackLng: 'en',
    supportedLngs: uniq([...languages, 'en']),
    cleanCode: true,
    detection: detectorOptions,
    backend: httpBackendOptions,
  };

  const newInstance = i18next.createInstance();

  newInstance.on('loaded', handleLoaded);
  newInstance.on('failedLoading', handleFailedLoading);
  newInstance.on('missingKey', handleMissingKey);

  await newInstance
    .use(LanguageDetector)
    .use(HttpBackend)
    .init(i18nextOptions);

  return newInstance;
}

export { createI18next as default };
