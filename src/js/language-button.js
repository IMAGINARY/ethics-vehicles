import * as langmap from 'langmap';
import { eventFilter, eventFilters } from './event-help';

export default class LanguageButton {
  constructor(i18next, config) {
    this.i18next = i18next;
    this.config = config;

    this.$button = $('#languageButton');
    this.$buttonLabel = $('#languageText');

    const handleKeyDownL = eventFilter(eventFilters.KEY_L, this.switchToNextLanguage.bind(this));
    window.addEventListener('keydown', handleKeyDownL);
    this.$button.click(this.switchToNextLanguage.bind(this));

    this.updateLabel();
  }

  switchToNextLanguage() {
    const { languages } = this.config;
    const lngIndex = this.i18next.languages.reduce(
      (accIndex, curLng) => (accIndex !== -1 ? accIndex : languages.indexOf(curLng)),
      -1
    );
    if (lngIndex !== -1) {
      const newLngIndex = (lngIndex + 1) % languages.length;
      const newLng = languages[newLngIndex];
      this.i18next.changeLanguage(newLng)
        .then(() => this.updateLabel());
    }
  }

  updateLabel() {
    const lng = this.i18next.language;
    this.$buttonLabel.text(langmap[lng].nativeName);
  }
}
