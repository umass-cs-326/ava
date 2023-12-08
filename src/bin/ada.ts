#!/usr/bin/env node

import { TestRunnerFactory, TestResults } from '../lib/test-runner.js';

async function main() {
  try {
    const runner = TestRunnerFactory.makeNodeTestRunner(['./tests']);
    const results: TestResults = await runner.runTests();
    console.log(results);
  } catch (error: any) {
    console.log('There was an error running the tests:');
    console.log(error.message);
  }
}

main().then(() => {
  console.log('Done.');
});
