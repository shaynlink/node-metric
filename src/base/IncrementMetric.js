import BaseMetric from './BaseMetric.js';

export default class IncrementMetric extends BaseMetric {
  constructor(initialValue = 0, options = {}) {
    super(initialValue, options);
    this.options.incrementStep ??= 1;
    this.options.limitCounter ??= Number.MAX_SAFE_INTEGER;
    this.options.keepCounter ??= true;

    if (this.initialValue) {
      this.history.push({
        value: this.initialValue,
        timestamp: this.options.onGetCurrentDate(),
        operator: 'initial',
      });
    }
  }

  get value() {
    return this.#calculateValue(this.history);
  }

  #calculateValue(history) {
    return history.reduce((acc, curr) => {
      if (curr.operator === 'initial') {
        return acc;
      }
      if (curr.operator === 'increment') {
        return acc + curr.value;
      } else {
        return acc - curr.value;
      }
    }, this.initialValue);
  }

  #cleanHistory() {
    const sliceIndex = this.history.length - this.options.historyLimit;
    const countLeft = this.#calculateValue(this.history.splice(0, sliceIndex));
    if (!this.options.keepCounter) {
      this.initialValue = countLeft;
    }
  }

  #action() {
    this.#cleanHistory();
    this.emit('change', {
      value: this.value,
      history: this.history,
    });
  }

  flush() {
    this.initialValue = this.#calculateValue(this.history);
    this.history = [];
    this.#action();
  }

  reset() {
    this.initialValue = 0;
    this.history = [];
    this.#action();
  }

  increment() {
    this.history.push({
      value: this.options.incrementStep,
      timestamp: this.options.onGetCurrentDate(),
      operator: 'increment',
    });
    this.#action();
  }

  incrementBy(value) {
    this.history.push({
      value,
      timestamp: this.options.onGetCurrentDate(),
      operator: 'increment',
    });
    this.#action();
  }

  decrement() {
    this.history.push({
      value: this.options.incrementStep,
      timestamp: this.options.onGetCurrentDate(),
      operator: 'decrement',
    });
    this.#action();
  }

  decrementBy(value) {
    this.history.push({
      value,
      timestamp: this.options.onGetCurrentDate(),
      operator: 'decrement',
    });
    this.#action();
  }
}
