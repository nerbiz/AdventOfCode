export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const [width, height] = linesArray.shift().match(/\d+/g).map(number => number - 0);
        const digits = linesArray.shift().split('').map(number => number - 0);

        return {width, height, digits};
    }
}
