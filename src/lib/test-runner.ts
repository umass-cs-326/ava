import { tap } from 'node:test/reporters';
import { run } from 'node:test';
import path from 'node:path';
import { Parser } from 'tap-parser';

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
  runTests: () => Promise<TestResults>;
}

class NodeTestRunner implements TestFramework {
  #testFiles: string[] = [];

  #extractPoints(input: string): { testname: string; points: number } {
    const match = input.match(/\[(\d+)\](.+)/);
    if (match && match[1]) {
      return {
        points: parseInt(match[1], 10),
        testname: match[2].trim(),
      };
    }
    throw new Error(`Could not extract points from test name: ${input}`);
  }

  constructor(testFiles: string[]) {
    this.#testFiles = testFiles;
  }

  runTests(): Promise<TestResults> {
    const files = this.#testFiles.map(file => path.resolve(file));
    const tapParser = new Parser();
    const results: TestResults = { passing: [], failing: [] };

    return new Promise((resolve, reject) => {
      tapParser.on('pass', (res: any) => {
        const { testname, points } = this.#extractPoints(res.name);
        results.passing.push({ testname, points });
      });

      tapParser.on('fail', (res: any) => {
        const { testname, points } = this.#extractPoints(res.name);
        results.failing.push({ testname, points, reason: res.diag.error });
      });

      tapParser.on('complete', (res: any) => {
        resolve(results);
      });

      tapParser.on('error', (err: any) => {
        reject(err);
      });

      run({ files: files }).compose(tap).pipe(tapParser);
    });
  }
}

export class TestRunnerFactory {
  static makeNodeTestRunner(testFiles: string[]): TestFramework {
    return new NodeTestRunner(testFiles);
  }
}
