#!/usr/bin/env node

import { TestRunnerFactory } from '../lib/test-runner.js';

const testRunner = TestRunnerFactory.makeNodeTestRunner([
  './tests/add.test.js',
]);
const results = testRunner.runTests().then(results => {
  console.log(results);
});
