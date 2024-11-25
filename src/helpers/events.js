import { EventEmitter } from 'node:events';

export function useEventEmitter(base) {
  return class extends base {
    constructor(...args) {
      super(...args);
      this._eventEmitter = new EventEmitter();
    }

    addListener(event, listener) {
      return this._eventEmitter.addListener(event, listener);
    }

    emit(event, ...args) {
      return this._eventEmitter.emit(event, ...args);
    }

    eventNames() {
      return this._eventEmitter.eventNames();
    }

    getMaxListeners() {
      return this._eventEmitter.getMaxListeners();
    }

    listenerCount(event, listener) {
      return this._eventEmitter.listenerCount(event, listener);
    }

    listeners(event) {
      return this._eventEmitter.listeners(event);
    }

    off(event, listener) {
      return this._eventEmitter.off(event, listener);
    }

    on(event, listener) {
      return this._eventEmitter.on(event, listener);
    }

    once(event, listener) {
      return this._eventEmitter.once(event, listener);
    }

    prependListener(event, listener) {
      return this._eventEmitter.prependListener(event, listener);
    }

    prependOnceListener(event, listener) {
      return this._eventEmitter.prependOnceListener(event, listener);
    }

    removeAllListeners(event) {
      return this._eventEmitter.removeAllListeners(event);
    }

    removeListener(event, listener) {
      return this._eventEmitter.removeListener(event, listener);
    }

    setMaxListeners(n) {
      return this._eventEmitter.setMaxListeners(n);
    }

    rawListeners(event) {
      return this._eventEmitter.rawListeners(event);
    }

    [Symbol.for('nodejs.rejection')](err, eventName, ...args) {
      return this._eventEmitter[Symbol.for('nodejs.rejection')](
        err,
        eventName,
        ...args,
      );
    }
  };
}
