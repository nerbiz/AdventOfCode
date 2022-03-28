export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const matches = linesArray.at(0).match(/\d+/g);

        return {
            players: matches[0] - 0,
            lastMarble: matches[1] - 0,
        };
    }
}
