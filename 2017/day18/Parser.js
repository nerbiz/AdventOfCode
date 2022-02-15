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
            const instruction = line.split(' ');

            for (const index of [1, 2]) {
                if (instruction[index]?.match(/\d/)) {
                    instruction[index] -= 0;
                }
            }

            return instruction;
        });
    }
}
