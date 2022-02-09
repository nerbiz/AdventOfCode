export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const lineRegExp = /([a-z]+) \((\d+)\)(?: -> (.+))?/;

        return linesArray.map(line => {
            const matches = line.match(lineRegExp);

            return {
                name: matches[1],
                weight: matches[2] - 0,
                above: (matches[3] !== undefined)
                    ? matches[3].split(', ')
                    : []
            };
        });
    }
}
