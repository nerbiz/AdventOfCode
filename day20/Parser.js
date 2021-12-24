export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        return {
            algorithm: linesArray.shift(),
            // 1 = light (on),
            // 0 = dark (off)
            imagePixels: linesArray.slice(1).map(
                line => line.split('').map(pixel => Number(pixel === '#'))
            ),
        };
    }
}
