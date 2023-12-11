#!/usr/bin/env node

import { Command } from 'commander';

import {
  TestRunnerFactory,
  TestResults,
} from '../lib/autograder/test-runner.js';

const program = new Command();

program
  .name('ada')
  .description('Ada Autograder')
  .version('0.1.0');

program
  .command('autograde')
  .description('Invokes the autograder')
  .action(async () => {
    await ada_autograde();
  });

program
  .command('subcommand2 <requiredArg>')
  .description('Run subcommand 2 with a required argument')
  .option('-o, --optional [value]', 'An optional argument')
  .action((requiredArg, options) => {
    console.log(`Subcommand 2 executed with required argument: ${requiredArg}`);
    if (options.optional) {
      console.log(`Optional argument: ${options.optional}`);
    }
  });

program.parse(process.argv);

// Subcommands Below //

async function ada_autograde() {
  try {
    const runner = TestRunnerFactory.makeNodeTestRunner(['./tests']);
    const results: TestResults = await runner.runTests();
    console.log(results);
  } catch (error: any) {
    console.log('There was an error running the tests:');
    console.log(error.message);
  }
}
