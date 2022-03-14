export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map(instruction => {
            // Parse the action
            const action = instruction.match(/toggle|(turn (on|off))/);

            // Parse the coordinates
            const firstDigit = instruction.match(/\d/);
            const [start, end] = instruction.slice(firstDigit.index).split(' through ');
            const [startX, startY] = start.split(',').map(number => parseInt(number, 10));
            const [endX, endY] = end.split(',').map(number => parseInt(number, 10));

            return {
                action: action[2] || action[0],
                startX,
                startY,
                endX,
                endY,
            };
        });
    }
}
