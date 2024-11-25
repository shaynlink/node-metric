import { EventEmitter } from 'node:events';
import { METRIC_FINGERPRINT } from './base/BaseMetric.js';

function construct(keys, value, base = {}) {
  let current = base; // New ref

  for (let i = 0; i < keys.length; i++) {
    if (!current[keys.at(i)]) {
      current[keys.at(i)] = {};
    }
    current = current[keys.at(i)];
  }

  current[keys.at(-1)] = value;
  return base;
}

export default class MetricRegistry extends EventEmitter {
  constructor() {
    super();
    this.registry = new Map();
  }

  register(name, struct) {
    const deconstruct = (currentStruct, prevKeys = [name]) => {
      if (currentStruct._metric_fingerprint === METRIC_FINGERPRINT) {
        currentStruct.on('change', (value) => {
          this.emit('change', { name, value });
        });
        currentStruct.on(prevKeys.join('.'), (value) => {
          this.emit('change', { name, value });
        });

        this.registry.set(prevKeys.join('.'), currentStruct);
        return;
      }
      for (const [key, value] of Object.entries(currentStruct)) {
        if (typeof value === 'object') {
          deconstruct(value, [...prevKeys, key]);
        } else {
          currentStruct.on('change', (value) => {
            this.emit('change', { name, value });
          });
          currentStruct.on([...prevKeys, key].join('.'), (value) => {
            this.emit('change', { name, value });
          });
          this.registry.set([...prevKeys, key].join('.'), value);
        }
      }
    };
    deconstruct(struct);
  }

  get(name) {
    const getterKeys = name.split('.');

    if (getterKeys.length === 1 && this.registry.has(name)) {
      return this.registry.get(name);
    }

    let struct = null;

    for (const [key, value] of [...this.registry.entries()]) {
      if (key === name) {
        return this.registry.get(key);
      } else if (
        getterKeys.every(
          (getterKey, index) => key.split('.')[index] === getterKey,
        )
      ) {
        struct ??= {};
        struct = construct(
          key.split('.').slice(name.split('.').length),
          value,
          struct,
        );
      }
    }

    return struct;
  }

  delete(name) {
    if (this.registry.has(name)) {
      this.registry.get(name).removeAllListeners();
    }
    this.registry.delete(name);
  }
}
