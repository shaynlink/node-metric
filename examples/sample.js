import MetricRegistry, { IncrementMetric, DateMetric } from '../src/index.js';

const registry = new MetricRegistry();

const incrementMetric = new IncrementMetric(0, { incrementStep: 2 });

registry.register('counter1', incrementMetric);
registry.register('counter2', new IncrementMetric(0, { incrementStep: 3 }));
registry.register('date', new DateMetric());

registry.register('struct', {
  counter: new IncrementMetric(0, { historyLimit: 3 }),
  date: new DateMetric({ historyLimit: 1 }),
});

// registry.on('counter*', (metric) => {
//   console.log('Counter metric changed:', metric);
// });

// registry.on('counter*', (metrics) => {

// });

registry.on('date', (metric) => {
  console.log('Date metric changed:', metric);
});

registry.on('struct', (metric) => {
  console.log('Struct metric changed:', metric);
});

registry.on('struct.counter', (metric) => {
  console.log('Struct counter metric changed:', metric);
});

registry.on('change', (metrics) => {
  console.log('Change:', metrics);
});

registry.on('struct.counter', (metric) => {
  console.log('Struct counter metric changed:', metric);
});

incrementMetric.increment();
incrementMetric.increment();

registry.get('counter1').increment();

registry.get('struct').counter.increment();

registry.get('date').now();
registry.get('date').now();
registry.get('date').newBy(new Date().toISOString());

registry.delete('counter');
registry.get('counter')?.increment();

console.log(registry);
