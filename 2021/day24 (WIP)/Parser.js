export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        let instructions = [];
        let nextInputIndex = 0;

        while (linesArray.length > 0) {
            // Get all the lines before the next 'inp' line
            nextInputIndex = linesArray.slice(1).findIndex(line => line.startsWith('inp'));
            nextInputIndex = (nextInputIndex !== -1) ? nextInputIndex + 1 : linesArray.length;
            instructions.push(linesArray.slice(0, nextInputIndex));
            
            // Remove the used lines
            linesArray = linesArray.slice(nextInputIndex);
        }

        // Split each instruction into parts, converting to number where needed
        instructions = instructions.map(list => list.map(
            instruction => instruction.split(' ').map(part => (part.match(/^-?\d+$/))
                ? parseInt(part, 10)
                : part
        )));

        return instructions;
    }
}
