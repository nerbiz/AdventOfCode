export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        linesArray = linesArray
            .map(line => line
                .split(':')
                .at(1)
                .match(/\d+/g)
                .map(number => number - 0)
            );

        return {
            times: linesArray[0],
            distances: linesArray[1],
        };
    }
}
