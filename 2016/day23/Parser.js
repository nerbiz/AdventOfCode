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
            const instruction = line.split(' ');

            if (instruction[1].match(/\d/)) {
                instruction[1] -= 0;
            }

            if (instruction[2] !== undefined && instruction[2].match(/\d/)) {
                instruction[2] -= 0;
            }

            return instruction;
        });
    }
}
