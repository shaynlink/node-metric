import MetricRegistry, { PerformanceMetric } from '../src/index.js';

const registry = new MetricRegistry();
registry.register('performance', new PerformanceMetric(() => {}));

registry.get('performance').observe({
  entryTypes: [
    'measure',
    'function',
    'gc',
    'http2',
    'http',
    'mark',
    'net',
    'node',
    'resource',
  ],
});

const performance2 = new PerformanceMetric((items) => items.getEntries()[0]);
registry.register('performance2', performance2);

// console.log(registry.get('performance'));

// console.log(registry.get('performance'));

performance2.observe({ entryTypes: ['measure'] });

registry.on('performance', (metric) => {
  console.log('Performance metric changed:', metric);
});

registry.on('performance2', (metric) => {
  console.log('Performance2 metric changed:', metric);
});

// const multi = registry.gets('performance*');

// multi.take((metrics) => metrics.mark('A'));

// (async () => {
//   await new Promise((r) => setTimeout(r, 5000));
//   performance.measure('A to Now', 'A');

//   performance.mark('A');
//   performance.measure('A to B', 'A', 'B');
// })();
