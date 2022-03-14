import Utilities from '../../Utilities.js';

export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        // Get all the bots and outputs
        const joinedLines = linesArray.join('');
        const bots = joinedLines.match(/bot \d+/g);
        const outputs = joinedLines.match(/output \d+/g);

        // Parse the lines about value inputs
        const inputs = linesArray.filter(line => line.startsWith('value'))
            .map(line => Array.from(line.match(/\d+/g)))
            .map(matches => ({
                bot: matches[1] - 0,
                value: matches[0] - 0
            }));

        // Parse the lines about bots giving values to each other
        const givingRegExp = /(\d+).*((?:bot|output) \d+).*((?:bot|output) \d+)/;
        const giving = linesArray.filter(line => line.startsWith('bot'))
            .map(line => line.match(givingRegExp))
            .map(matches => ({
                bot: matches[1] - 0,
                low: matches[2],
                high: matches[3],
            }));

        return {
            bots: Utilities.arrayUnique(bots),
            outputs: Utilities.arrayUnique(outputs),
            inputs,
            giving,
        };
    }
}
