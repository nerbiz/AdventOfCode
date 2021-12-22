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
        let scannerIndex = 0;

        // Filter out the '--- scanner 0 ---' lines
        linesArray = linesArray.filter(line => ! line.startsWith('---'));

        while (linesArray.length > 0) {
            // Add the lines up to the first empty line to a scanner
            scanners.push({
                index: scannerIndex++,
                beacons: linesArray.splice(0, linesArray.indexOf(''))
                    .map((coordinates, index) => ({
                        index,
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
