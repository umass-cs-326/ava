import Tap from './Tap.js';
import Points from './Points.js';

const results = await Tap.readTapFromStdIn();
const resultsWithPoints = Points.calculatePoints(results);

console.log(JSON.stringify(resultsWithPoints, null, 2));