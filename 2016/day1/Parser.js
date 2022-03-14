export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.at(0).split(', ')
            .map(instruction => [
                instruction[0],
                instruction.substring(1),
            ])
            .map(instruction => {
                instruction[1] = parseInt(instruction[1], 10);
                return instruction;
            });
    }
}
