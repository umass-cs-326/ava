import Tap from '../lib/Tap';
import Points from '../lib/Points';

const results: { passing: any[]; failing: any[] } =
  await Tap.readTapFromStdIn();
const resultsWithPoints = Points.calculatePoints(results);

console.log(JSON.stringify(resultsWithPoints, null, 2));
