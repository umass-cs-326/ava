/**
 * Class representing a points calculator for test results.
 */
class PointsCalculator {
  /**
   * Calculates the total points from test results.
   *
   * @param {Object} tapResults - The test results object.
   * @param {Array} tapResults.passing - Array of passing test result objects.
   * @param {Array} tapResults.failing - Array of failing test result objects.
   * @returns {Object} An object containing the total points and the detailed points for passing and failing tests.
   *                   If an error occurs, returns an object with an error message.
   */
  calculatePoints(tapResults: { passing: any[]; failing: any[] }) {
    const { passing, failing } = tapResults;
    const passingClone = structuredClone(passing); // Cloning the passing array to avoid mutating the original array
    const faillingClone = structuredClone(failing); // Cloning the failing array

    // Attempt to process each passing test
    try {
      passingClone.forEach(t => {
        const { points, name } = this.#pointsAndName(t.name); // Extracting points and name from each test's name
        t.points = points; // Assigning points to the test
        t.testName = name; // Updating test name
      });
    } catch (e: any) {
      return { error: e.message }; // Returning an error object if an exception is thrown
    }

    // Similar processing for failing tests
    try {
      faillingClone.forEach(t => {
        const { points, name } = this.#pointsAndName(t.name);
        t.points = points;
        t.testName = name;
      });
    } catch (e: any) {
      return { error: e.message };
    }

    // Calculating total points for passing and failing tests
    const passingPoints = passingClone.reduce((acc, t) => acc + t.points, 0);
    const failingPoints = faillingClone.reduce((acc, t) => acc + t.points, 0);

    const totalPoints = passingPoints + failingPoints;
    // Validating the total points
    if (totalPoints > 100) {
      return {
        error: `Error: Total points cannot exceed 100 (total points = ${totalPoints})`,
      };
    } else if (totalPoints < 100) {
      return {
        error: `Error: Total points cannot be less than 100 (total points = ${totalPoints})`,
      };
    }

    // Returning the final results
    return {
      totalPoints,
      passing: passingClone,
      failing: faillingClone,
    };
  }

  /**
   * Private method to extract points and test name from a given test name string.
   *
   * @param {string} name - The test name string.
   * @returns {Object} An object containing extracted points and the trimmed test name.
   * @throws Will throw an error if the test name is not properly formatted.
   * @private
   */
  #pointsAndName(name: string) {
    const regex = /\[(\d+)\]\s*(.*)/; // Regular expression to extract points and test name
    const match = name.match(regex); // Matching the name against the regex

    // Checking if the match is successful and both parts are captured
    if (!match || match[1] === undefined || match[2] === undefined) {
      throw new Error(`Error: test name is not formatted properly: ${name}`);
    }

    // Returning the extracted points and test name
    return {
      points: parseInt(match[1], 10),
      name: match[2].trim(),
    };
  }
}

const Points = new PointsCalculator();

export default Points;
