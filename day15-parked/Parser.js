export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map((line, yIndex) => line.split('')
            .map((number, xIndex) => ({
                x: xIndex,
                y: yIndex,
                // The risk level of the point
                value: parseInt(number, 10),
                // Whether to use this point in the path
                use: false,
            })));
    }
}
