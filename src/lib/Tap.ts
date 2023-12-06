/**
 * This module provides functionality for reading TAP (Test Anything Protocol)
 * results from standard input. It utilizes the 'tap-parser' package for
 * parsing TAP output.
 *
 * @module Tap
 */

import { Parser } from 'tap-parser';
import process from 'node:process';

const Tap = {
  /**
   * Reads TAP output from standard input and categorizes tests into passing
   * and failing.
   *
   * @returns {Promise<Object>} A Promise that resolves to an object
   * containing two keys:
   *                            - `passing`: An array of passing tests.
   *                            - `failing`: An array of failing tests.
   */
  readTapFromStdIn(): Promise<{ passing: any[]; failing: any[] }> {
    return new Promise((resolve, reject) => {
      const tapParser: any = new Parser();
      const passing: any = [];
      const failing: any = [];

      tapParser.on('pass', (res: any) => {
        passing.push(res);
      });

      tapParser.on('fail', (res: any) => {
        failing.push(res);
      });

      tapParser.on('complete', (res: any) => {
        resolve({ passing, failing });
      });

      tapParser.on('error', (err: any) => {
        reject(err);
      });

      process.stdin.pipe(tapParser);
    });
  },
};

export default Tap;
