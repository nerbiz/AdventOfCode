export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const scanners = [];
        let scannerIndex = -1;

        // Filter out the '--- scanner 0 ---' lines
        linesArray = linesArray.filter(line => ! line.startsWith('---'));

        while (linesArray.length > 0) {
            scannerIndex++;

            // Add the lines up to the first empty line to a scanner
            scanners.push({
                index: scannerIndex,
                // Coordinates relative to scanner 0, to be filled in later
                coordinates: {},
                // Beacons that other scanners also see, to be filled in later
                overlapping: [],
                beacons: linesArray.splice(0, linesArray.indexOf(''))
                    .map((coordinates, index) => ({
                        index,
                        scanner: scannerIndex,
                        coordinates: coordinates.split(',').map(number => parseInt(number, 10)),
                        // Distances between beacons, to be filled in later
                        distances: [],
                    })),
            });

            // Remove the empty line before the next coordinate lines
            linesArray.shift();
        }

        return scanners;
    }
}
