export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray
            .map(line => line.match(/< *?(-?\d+), +?(-?\d+)>.+?< *?(-?\d+), +?(-?\d+)>/))
            .map(matches => ({
                position: [matches[1] - 0, matches[2] - 0],
                velocity: [matches[3] - 0, matches[4] - 0],
            }));
    }
}
