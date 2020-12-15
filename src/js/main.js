/* globals $ */
import defaultConfig from './default-config';
import View from './view';
import './situations/car-enters-lane';
import './situations/tree-falls';
import './situations/child-runs';
import createI18next from './i18n';


/**
 * Loads the config file from an external JSON file
 *
 * @param {String} uri
 * @return {Promise<any>}
 */
async function loadConfig(uri) {
  const response = await fetch(uri, {
    cache: 'no-store',
  });
  if (response.status >= 200 && response.status < 300) {
    try {
      return await response.json();
    } catch (e) {
      throw new Error(`Error parsing config file: ${e.message}`);
    }
  }
  throw new Error(`Server returned status ${response.status} (${response.statusText}) loading config file.`);
}

/**
 * Return the URL of the user-supplied config file or {null} if it is not present.
 *
 * A custom config file name can be provided via the 'config' query string variable.
 * Allowed file names must match the regex /^[A-Za-z0\-_.]+$/.
 *
 * @returns {URL|null} User-supplied config URL or {null} if not supplied.
 * @throws {Error} If the user-supplied config file name doesn't match the regex.
 */
function getCustomConfigUrl() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  if (!urlSearchParams.has('config')) {
    return null;
  }

  const customConfigName = urlSearchParams.get('config');
  const whitelistRegex = /^[A-Za-z0\-_.]+$/;
  if (whitelistRegex.test(customConfigName)) {
    return new URL(customConfigName, window.location.href);
  }

  throw new Error(`Custom config path ${customConfigName} must match ${whitelistRegex.toString()}.`);
}

/**
 * Load config files and start the program
 */
async function main() {
  try {
    const defaultConfigUrl = new URL('./config.json', window.location.href);
    const customConfigUrl = getCustomConfigUrl();
    const configUrl = customConfigUrl || defaultConfigUrl;
    const config = { ...defaultConfig, ...await loadConfig(configUrl.href) };

    const i18next = await createI18next(config.languages, true); // TODO: i18n with i18next

    const view = new View($('#game')[0], i18next, config);
    window.view = view;
    view.start();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

main()
  .then(() => undefined);
