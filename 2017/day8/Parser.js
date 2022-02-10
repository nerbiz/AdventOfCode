export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map(line => {
            const parts = line
                // Change negative decrease to increase
                .replaceAll('dec -', '')
                // Change positive decrease to decrease
                .replaceAll('dec ', '-')
                .replaceAll('inc ', '')
                .split(' ');

            return {
                register: parts[0],
                modify: parts[1] - 0,
                condition: parts.slice(-3).map((part, index) =>
                    (index === 2) ? part - 0 : part
                ),
            };
        });
    }
}
