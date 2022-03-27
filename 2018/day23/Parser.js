export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const lineRegExp = /-?\d+/g;

        return linesArray.map(line => {
            const matches = line.match(lineRegExp);

            return {
                x: matches[0] - 0,
                y: matches[1] - 0,
                z: matches[2] - 0,
                radius: matches[3] - 0,
            };
        });
    }
}
