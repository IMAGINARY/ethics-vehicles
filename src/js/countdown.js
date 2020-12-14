import { EventEmitter } from 'events';

export default class Countdown extends EventEmitter {
  constructor(timeout) {
    super();

    const doneCbWrapper = () => {
      clearTimeout(this.timeoutRunner);
      clearInterval(this.intervalRunner);
      if (!this.isAborted) {
        this.isDone = true;
        this.emit('done');
        this.removeAllListeners();
      }
    };

    this.isDone = false;
    this.isAborted = false;
    this.intervalRunner = setInterval(() => this.emit('tick', this.remainingMs()), 1000);
    this.timeoutRunner = setTimeout(doneCbWrapper, timeout);
    this.timeoutEnd = performance.now() + timeout;
  }

  remainingMs() {
    return this.timeoutEnd - performance.now();
  }

  abort() {
    clearTimeout(this.timeoutRunner);
    clearInterval(this.intervalRunner);
    if (!this.isDone) {
      this.emit('aborted');
      this.removeAllListeners();
    }
  }
}
