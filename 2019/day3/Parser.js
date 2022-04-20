export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map(line => line.split(',').map(item => {
            const [, direction, amount] = item.match(/(.)(\d+)/);
            return [direction, amount - 0];
        }));
    }
}
