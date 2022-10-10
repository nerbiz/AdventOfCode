export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray
            .map(line => line.match(/[a-z]+(-compatible)? (microchip|generator)/g) || [])
            .map(matches => matches.map(match => match.replace('-compatible', '')));
    }
}
