export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const discRegExp = /(\d+).+?(\d+).+?\d+.+?(\d+)/;

        return linesArray.map(line => line.match(discRegExp))
            .map(matches => ({
                number: matches[1] - 0,
                positions: matches[2] - 0,
                start: matches[3] - 0,
            }));
    }
}
