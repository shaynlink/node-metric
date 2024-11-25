import MetricRegistry, { IncrementMetric } from '../src/index.js';

const registry = new MetricRegistry();

const incrementMetric = new IncrementMetric(0, { incrementStep: 2 });

registry.register('counter1', incrementMetric);

registry.on('counter', (metric) => {
  console.log('Counter metric changed:', metric);
});

incrementMetric.increment();

registry.get('counter1').increment();

console.log(registry);

console.log(registry.listeners('conter1'));
console.log(registry.listenerCount('conter1'));
