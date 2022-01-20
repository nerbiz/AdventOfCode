export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const polymer = linesArray.shift();
        const insertionRules = {};

        linesArray.slice(1).forEach(line => {
            const [pair, insert] = line.split(' -> ');
            insertionRules[pair] = insert;
        });

        return {polymer, insertionRules};
    }
}
