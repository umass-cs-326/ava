import { tap } from 'node:test/reporters';
import { run } from 'node:test';
import path from 'node:path';
import { Parser } from 'tap-parser';
import * as fs from 'fs/promises';

type GenericTest = { testname: string; points: number };
type PassingTest = GenericTest;
type FailingTest = PassingTest & { reason: string };
type TestResults = { passing: PassingTest[]; failing: FailingTest[] };

const testFiles = async (
  dirs: string[],
  pattern: RegExp
): Promise<string[]> => {
  try {
    const matchingFiles: string[] = [];
    dirs.forEach(async dir => {
      const files = await fs.readdir(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);

        if (stats.isFile() && pattern.test(file)) {
          matchingFiles.push(filePath);
        }
      }
    });

    return matchingFiles;
  } catch (error: any) {
    throw new Error(`Error reading directory: ${error.message}`);
  }
};

const extractPoints = (input: string): GenericTest => {
  const match = input.match(/\[(\d+)\](.+)/);
  if (match && match[1]) {
    return {
      points: parseInt(match[1], 10),
      testname: match[2].trim(),
    };
  }
  throw new Error(`Could not extract points from test name: ${input}`);
};

export const nodeTestRunnerTap = async (
  testDirs: string[]
): Promise<TestResults> => {
  const parser = new Parser();
  const results: TestResults = { passing: [], failing: [] };
  const tapParser = new Parser();
  const xs = await testFiles(testDirs, /.*\.test\.js$/);
  const files = xs.map(file => path.resolve(file));

  return new Promise<TestResults>((resolve, reject) => {
    parser.on('assert', (assert: any) => {
      if (assert.ok) {
        results.passing.push(extractPoints(assert.name));
      } else {
        results.failing.push({
          ...extractPoints(assert.name),
          reason: assert.diag.message,
        });
      }
    });

    parser.on('complete', (results: any) => {
      if (results.ok) {
        console.log('All tests passed');
      } else {
        console.log('Some tests failed');
      }
      resolve(results);
    });

    parser.on('error', (error: any) => {
      reject(error);
    });

    run({ files: files }).compose(tap).pipe(tapParser);
  });
};
