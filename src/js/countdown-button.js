import { eventFilter, eventFilters, once } from './event-help';
import Countdown from './countdown';

class AdvanceButton {
  constructor(label, labelFormatter) {
    this.htmlButton = $('#advanceButton');
    this.htmlText = $('#advanceText');
    this.labelFormatter = labelFormatter;

    this.triggerPromise = new Promise((resolve) => {
      this.resolve = resolve;
    });

    const triggerOnEnter = eventFilter(eventFilters.KEY_ENTER, () => this.trigger());
    once(window, 'keydown', triggerOnEnter);
    once(this.htmlButton, 'click', () => this.trigger());

    this.setLabel(label);
    this.htmlButton.show();
  }

  setLabel(label) {
    this.label = label;
    this.updateLabel();
  }

  updateLabel() {
    this.htmlText.text(this.labelFormatter(this.label));
  }

  trigger() {
    this.htmlButton.hide();
    this.resolve();
  }

  async wait() {
    await this.triggerPromise;
  }
}

function formatCountdownLabel(label, countdown) {
  const secondsLeft = Math.max(1, Math.floor(countdown.remainingMs() / 1000));
  return `${label} (${secondsLeft})`;
}

export default function countdownButton(label, timeout) {
  const countdown = new Countdown(timeout);
  const countdownLabelFormatter = (l) => formatCountdownLabel(l, countdown);
  const advanceButton = new AdvanceButton(label, countdownLabelFormatter);

  countdown.on('tick', () => advanceButton.updateLabel());
  countdown.on('done', () => advanceButton.trigger());
  advanceButton.wait()
    .then(() => countdown.abort());

  return advanceButton;
}
