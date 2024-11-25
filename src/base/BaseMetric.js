import { EventEmitter } from 'node:events';

export const METRIC_FINGERPRINT = Symbol('METRIC_FINGERPRINT');

function createBaseMetricContructor(self, initialValue, options) {
  self._metric_fingerprint = METRIC_FINGERPRINT;
  self.initialValue = initialValue;
  self.options = options;
  self.options ??= {};
  self.options.onGetCurrentDate ??= () => new Date();
  self.options.historyLimit ??= 2 ** 32 - 1; // 4_294_967_295 is the maximum value for an unsigned 32-bit integer for limit array length

  self.history = [];
}

export default class BaseMetric extends EventEmitter {
  constructor(initialValue, options) {
    super();
    createBaseMetricContructor(this, initialValue, options);
  }
}

export function useBaseMetric(base) {
  return class extends base {
    constructor(topArgs, initialValue, options = {}) {
      super(...topArgs);
      createBaseMetricContructor(this, initialValue, options);
    }
  };
}
