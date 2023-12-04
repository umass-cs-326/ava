#!/usr/bin/env node

import Tap from '../lib/Tap';
import Points from '../lib/Points';

const main = async () => {
  const results: { passing: any[]; failing: any[] } =
    await Tap.readTapFromStdIn();
  const resultsWithPoints = Points.calculatePoints(results);
};

const resultsWithPoints = main();
console.log(JSON.stringify(resultsWithPoints, null, 2));
