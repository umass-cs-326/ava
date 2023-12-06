import { tap } from 'node:test/reporters';
import { run } from 'node:test';
import path from 'node:path';
import { Parser, Result } from 'tap-parser';

// type Diagnostic = {
//   location: string;
//   failureType: string;
//   error: string;
//   code: string;
//   name: string;
//   expected: number;
//   actual: number;
//   operator: string;
//   stack: string;
// };

// export type TapTestResult = {
//   ok: boolean;
//   name: string;
//   id: number;
//   buffered: boolean;
//   tapError: boolean;
//   skip: boolean;
//   todo: boolean;
//   previous: null;
//   plan: null;
//   diag: Diagnostic | {};
//   time: number;
//   fullname: string;
//   closingTestPoint: boolean;
//   points: number;
//   testName: string;
// };

type PassingTest = { testname: string; points: number };
type FailingTest = { testname: string; points: number; reason: string };
type TestResults = { passing: PassingTest[]; failing: FailingTest[] };

interface TestFramework {
  runTests: () => TestResults;
}

class TapParserStream extends Parser {
  #testResults: TestResults = { passing: [], failing: [] };

  constructor() {
    super();
  }

  emit(eventName: string | symbol, ...args: any[]): boolean {
    if (eventName === 'pass') {
      const result = args as Result[];
      const testResult = result[0];
      console.log('Test passed: ', testResult.name);
    }
    else if (eventName === 'fail') {
      const result = args as Result[];
      const testResult = result[0];
      console.log('Test failed: ', testResult.name);
    }
    return true;
  }

  getTestResults(): TestResults {
    return this.#testResults;
  }
}

class NodeTestRunner implements TestFramework {
  #testFiles: string[] = [];
  #tapParser: Parser = new Parser();

  constructor(testFiles: string[]) {
    this.#testFiles = testFiles;
  }

  runTests(): TestResults {
    const files = this.#testFiles.map(file => path.resolve(file));
    const tapParser = new TapParserStream();
    run({ files: files }).compose(tap).pipe(tapParser);
    return tapParser.getTestResults();
  }
}

export class TestRunnerFactory {
  static makeNodeTestRunner(testFiles: string[]): TestFramework {
    console.log('Creating NodeTestRunner');
    return new NodeTestRunner(testFiles);
  }
}
