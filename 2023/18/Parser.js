export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map(line => {
            let [direction, amount, color] = line.replace(/[()]/g, '').split(' ');
            amount -= 0;
            return [direction, amount, color];
        });
    }
}
