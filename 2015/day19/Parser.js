export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        return {
            replacements: linesArray.slice(0, linesArray.indexOf(''))
                .map(replacement => replacement.split(' => ')),
            molecule: linesArray.pop(),
        };
    }
}
