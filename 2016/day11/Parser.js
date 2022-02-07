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
            .map(line => line.matchAll(/(\w+)(?:-compatible)? (microchip|generator)/g))
            .map(matches =>
                Array.from(matches).map(match => ({
                    type: match[2],
                    element: match[1]
                }))
            );
    }
}
