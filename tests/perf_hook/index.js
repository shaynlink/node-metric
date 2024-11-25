import { PerformanceObserver, performance } from 'node:perf_hooks';

const obs = new PerformanceObserver((items) => {
  console.log(items);
  console.log(items.getEntries());
  console.log(items.getEntries()[0]);
});

obs.observe({ entryTypes: ['measure'] });
performance.mark('A');

(async function doSomeLongRunningProcess() {
  await new Promise((r) => setTimeout(r, 5000));
  performance.measure('A to Now', 'A');

  performance.mark('B');
  performance.measure('A to B', 'A', 'B');
})();
