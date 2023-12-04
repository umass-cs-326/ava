class PointsCalculator {
    calculatePoints(tapResults) {
        const { passing, failing } = tapResults;
        const passingClone = structuredClone(passing);
        const faillingClone = structuredClone(failing);

        try {
            passingClone.forEach(t => {
                const { points, name } = this.#pointsAndName(t.name);
                t.points = points;
                t.testName = name;
            });
        }
        catch (e) {
            return { error: e.message };
        }

        try {
            faillingClone.forEach(t => {
                const { points, name } = this.#pointsAndName(t.name);
                t.points = points;
                t.testName = name;
            });
        }
        catch (e) {
            return { error: e.message };
        }

        const passingPoints = passingClone.reduce((acc, t) => acc + t.points, 0);
        const failingPoints = faillingClone.reduce((acc, t) => acc + t.points, 0);

        const totalPoints = passingPoints + failingPoints;
        if (totalPoints > 100) {
            return { error: `Error: Total points cannot exceed 100 (total points = ${totalPoints})` };
        } else if (totalPoints < 100) {
            return { error: `Error: Total points cannot be less than 100 (total points = ${totalPoints})` };
        }

        return {
            totalPoints,
            passing: passingClone,
            failing: faillingClone
        };
    }

    #pointsAndName(name) {
        const regex = /\[(\d+)\]\s*(.*)/;
        const match = name.match(regex);

        if (!match || match[1] === undefined || match[2] === undefined) {
            throw new Error(`Error: test name is not formatted propertly: ${name}`);
        }

        return {
            points: parseInt(match[1], 10),
            name: match[2].trim()
        };
    }
}

const Points = new PointsCalculator();

export default Points;