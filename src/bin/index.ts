#!/usr/bin/env node

// I wish I could remove the .js extension, but the compiled could wouldn't
// work without it.
// import Tap from '../lib/Tap.js';
// import Points from '../lib/Points.js';

// const results: Promise<{ passing: any[]; failing: any[] }> =
//   Tap.readTapFromStdIn();

// // NOTE: I couldn't use await here because the file is not a module and
// // TypeScript doesn't allow top-level await in non-module files.
// results.then(results => {
//   const resultsWithPoints = Points.calculatePoints(results);
//   console.log(JSON.stringify(resultsWithPoints, null, 2));
// });

import { TestRunnerFactory } from '../lib/test-runner.js';

const testRunner = TestRunnerFactory.makeNodeTestRunner([
  './tests/add.test.js',
]);
const results = testRunner.runTests();
console.log(results);
