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
            let [direction, amount] = line.split(' ');
            amount = parseInt(amount, 10);

            return {direction, amount};
        });
    }
}
