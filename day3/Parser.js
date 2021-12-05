export default class
{
    constructor()
    {
        this.parsedData = {};
    }

    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object} Key:value pairs of parsed data
     */
    parse(linesArray)
    {
        this.parsedData = linesArray;

        return this.parsedData;
    }
}
