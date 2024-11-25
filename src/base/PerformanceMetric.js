import { PerformanceObserver } from 'node:perf_hooks';
import { useBaseMetric } from './BaseMetric.js';
import { useEventEmitter } from '../helpers/events.js';

/**
 * Build on top of node:perf_hooks PerformanceObserver
 */
export default class PerformanceMetric extends useEventEmitter(
  useBaseMetric(PerformanceObserver),
) {
  constructor(observer, options = {}) {
    super([observer], null, options);
  }
}
