export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        return {
            timestamp: linesArray[0] - 0,
            busIds: linesArray[1].split(',').map(id =>
                (id.match(/\d/)) ? id - 0 : id
            ),
        };
    }
}
