export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const matches = linesArray.at(0).match(/(\d+).*?(\d+)/);

        return {
            players: matches[1] - 0,
            lastMarble: matches[2] - 0,
        };
    }
}
