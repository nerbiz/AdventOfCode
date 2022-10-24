export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const emptyLineIndex = linesArray.indexOf('');

        return [
            linesArray.slice(0, emptyLineIndex)
                .slice(1)
                .map(number => number - 0),
            linesArray.slice(emptyLineIndex + 1)
                .slice(1)
                .map(number => number - 0),
        ];
    }
}
