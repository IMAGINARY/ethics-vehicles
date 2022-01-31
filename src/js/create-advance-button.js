import { eventFilter, eventFilters } from './event-help';
import Countdown from './countdown';
import { tweenOpacity } from './style-help';

class AdvanceButton {
  constructor(label, labelFormatter) {
    this.htmlButton = document.querySelector('#advanceButton');
    this.htmlText = document.querySelector('#advanceText');
    this.labelFormatter = labelFormatter ?? AdvanceButton.ID_LABEL_FORMATTER;

    this.triggerPromise = new Promise((resolve) => {
      this.resolve = resolve;
    });

    this.triggerCb = () => this.trigger();
    this.triggerOnEnter = eventFilter(eventFilters.KEY_ENTER, this.triggerCb);

    window.addEventListener( 'keydown', this.triggerOnEnter);
    this.htmlButton.addEventListener('click', this.triggerCb);

    this.setLabel(label);
    this.fadeShow()
      .then();
  }

  setLabel(label) {
    this.label = label;
    this.updateLabel();
  }

  updateLabel() {
    this.htmlText.innerText = this.labelFormatter(this.label);
  }

  trigger() {
    window.removeEventListener( 'keydown', this.triggerOnEnter);
    this.htmlButton.removeEventListener('click', this.triggerCb);
    this.fadeHide()
      .then(() => this.resolve());
  }

  async wait() {
    await this.triggerPromise;
  }

  async fadeShow() {
    return tweenOpacity(this.htmlButton, 1, 500);
  }

  async fadeHide() {
    return tweenOpacity(this.htmlButton, 0, 500);
  }

  static ID_LABEL_FORMATTER(label) {
    return label;
  }
}

function formatCountdownLabel(label, countdown) {
  const secondsLeft = Math.max(1, Math.floor(countdown.remainingMs() / 1000));
  return `${label} (${secondsLeft})`;
}

function createAdvanceButtonWithCountdown(label, timeout) {
  const countdown = new Countdown(timeout);
  const countdownLabelFormatter = (l) => formatCountdownLabel(l, countdown);
  const advanceButton = new AdvanceButton(label, countdownLabelFormatter);

  countdown.on('tick', () => advanceButton.updateLabel());
  countdown.on('done', () => advanceButton.trigger());
  advanceButton.wait()
    .then(() => countdown.abort());

  return advanceButton;
}

export default function createAdvanceButton(label, timeout) {
  return typeof timeout === 'undefined'
    ? new AdvanceButton(label)
    : createAdvanceButtonWithCountdown(label, timeout);
}
