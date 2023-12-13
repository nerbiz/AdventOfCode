export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const valleys = [];
        let valley = [];

        for (const line of linesArray) {
            if (line === '') {
                valleys.push(valley);
                valley = [];
                continue;
            }

            valley.push(line);
        }

        return valleys;
    }
}
