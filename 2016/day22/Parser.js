export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const nodeRegExp = /.*?(\d+).*?(\d+).*?(\d+).*?(\d+).*?(\d+)/;

        return linesArray.slice(2).map(line => {
            const matches = line.match(nodeRegExp);

            return {
                x: matches[1] - 0,
                y: matches[2] - 0,
                size: matches[3] - 0,
                used: matches[4] - 0,
                available: matches[5] - 0,
            };
        });
    }
}
