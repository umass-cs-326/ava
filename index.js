import Tap from './lib/Tap.js';
import Points from './lib/Points.js';

const results = await Tap.readTapFromStdIn();
const resultsWithPoints = Points.calculatePoints(results);

console.log(JSON.stringify(resultsWithPoints, null, 2));