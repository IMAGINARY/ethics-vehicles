# Ethics of Autonomous Vehicles

An exhibit for the I AM AI exhibition.

## Configuration
The exhibit can be configured using a config file located at the same level as the `index.html` file.
By default, `./config.json` is used. A different config file can be specified via the
`config` query string variable, e.g. `index.html?config=myconfig.json`.

Possible config options include:
- `defaultLanguage` (string, default: `"en"`): Default language to use. Can be overridden by the
  `lang` query string.
- `languages` (array of strings, default: ['de', 'en']): The languages loaded for i18n.
  Must match `.json` locale files in `./assets/locales`.
- `showLanguageSwitcher` (boolean, default: `true`): Whether to show a button for switching
  languages. If the button is hidden, languages can still be switched using the <kbd>l</kbd> key.
- `autoAdvance` (boolean, default: `true`): Whether the app should automatically advance whenever
  stepping forward is the only possible action.
- `backgroundImage` (string, default `./assets/images/street.png`): Sets the path or URL to the background image.

## Compilation

This exhibit is built using several compilable languages:

- The HTML pages are built from **pug** template files.
- The CSS stylesheet is pre-compiled from **sass** files.
- The JS scripts are trans-compiled from **es6** (ES2015) files. 

To make any modifications re-compilation is necessary. You should install:

- **node** and **npm**
- **gulp** (install globally)

Afterwards run the following in the command line:

```
cd src
npm install
```

After it runs succesfuly you can compile as needed:

- **sass (stylesheets)**
    ```
    gulp styles
    ```
  
- **scripts (ES6)**
    ```
    gulp scripts
    ```

- **pug (HTML pages)**
    ```
    gulp html
    ```

- **all**
    ```
    gulp build
    ```

Start a web server at localhost:8080, from where you can use the exhibit:

    ```
    npm run start
    ```

### Third-party asset licensing

- Car crash audio files (modified) downloaded from Audiosoundclips.com
- Cars passing by audio files (modified) from http://audio-stock.com, downloaded from https://freesound.org/
- Language switcher icon downloaded from https://fontawesome.com/v5.10.2/icons/language?style=solid (CC-BY 4.0)
