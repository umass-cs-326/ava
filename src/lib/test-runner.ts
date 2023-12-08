import { tap } from 'node:test/reporters';
import { run } from 'node:test';
import path from 'node:path';
import { Parser } from 'tap-parser';
import * as fs from 'fs/promises';

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
export type TestResults = { passing: PassingTest[]; failing: FailingTest[] };

interface TestFramework {
  runTests: () => Promise<TestResults>;
}

class NodeTestRunner implements TestFramework {
  #testDirs: string[] = [];

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

  async #gatherFiles(dirs: string[], pattern: RegExp): Promise<string[]> {
    const files_1 = await Promise.all(
      dirs.map(async (dir) => {
        const files = await fs.readdir(dir);
        return files
          .filter(file => pattern.test(file))
          .map(file_1 => path.join(dir, file_1));
      })
    );
    return files_1.flat();
  }

  constructor(testDirs: string[]) {
    this.#testDirs = testDirs;
  }

  async runTests(): Promise<TestResults> {
    const files = await this.#gatherFiles(this.#testDirs, /.*\.test\.js$/);
    const resolvedFiles = files.map(file => path.resolve(file));
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

      run({ files: resolvedFiles }).compose(tap).pipe(tapParser);
    });
  }
}

export class TestRunnerFactory {
  static makeNodeTestRunner(testFiles: string[]): TestFramework {
    return new NodeTestRunner(testFiles);
  }
}
