export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const entries = linesArray.map(line => {
            const [input, output] = line.split(' => ');
            const [amount, chemical] = output.split(' ');

            return [chemical, {
                amount: amount - 0,
                requirements: Object.fromEntries(
                    input.split(', ').map(ingredient => {
                        const [amount, chemical] = ingredient.split(' ');
                        return [chemical, amount - 0];
                    })
                ),
            }];
        });

        return Object.fromEntries(entries);
    }
}
