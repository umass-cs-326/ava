/**
 * This module provides functionality for reading TAP (Test Anything Protocol)
 * results from standard input. It utilizes the 'tap-parser' package for 
 * parsing TAP output.
 * 
 * @module Tap
 */

import { Parser } from 'tap-parser';

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
  readTapFromStdIn() {
    return new Promise((resolve, reject) => {
      const tapParser = new Parser();
      const passing = [];
      const failing = [];

      tapParser.on('pass', (res) => {
        passing.push(res);
      });

      tapParser.on('fail', (res) => {
        failing.push(res);
      });

      tapParser.on('complete', (res) => {        
        resolve({ passing, failing });
      });

      process.stdin.pipe(tapParser);
    });
  }
};

export default Tap;
