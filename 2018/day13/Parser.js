export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        // Remove the last line
        linesArray.pop();

        // Get the maximum line length, for making all lines equal length
        let maxLength = 0;
        linesArray.forEach(line => maxLength = Math.max(maxLength, line.length));

        return linesArray
            .map(line => line.padEnd(maxLength, ' '))
            .map(line => line.split(''));
    }
}
