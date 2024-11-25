import BaseMetric from './BaseMetric.js';

export default class DateMetric extends BaseMetric {
  constructor(options = {}) {
    super(null, options);
  }

  get value() {
    return this.#calculateValue(this.history);
  }

  #calculateValue(history) {
    return history[history.length - 1]?.value;
  }

  #cleanHistory() {
    this.history.splice(0, this.history.length - this.options.historyLimit);
  }

  #action() {
    this.#cleanHistory();
    this.emit('change', {
      value: this.value,
      history: this.history,
    });
  }

  flush() {
    this.history = [];
    this.#action();
  }

  now() {
    this.history.push({
      value: new Date(),
      timestamp: this.options.onGetCurrentDate(),
    });

    this.#action();
  }

  newBy(date) {
    this.history.push({
      value: date,
      timestamp: this.options.onGetCurrentDate(),
    });

    this.#action();
  }
}
