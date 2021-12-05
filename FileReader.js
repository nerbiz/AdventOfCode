export default class
{
    /**
     * @param {string} filePath The path to the input file
     * @param {object} parser An object handling the file parsing
     */
    constructor(filePath, parser)
    {
        this.filePath = filePath;
        this.parser = parser;
        this.fileContents = null;
        this.fileLines = null;
    }

    /**
     * Read the input file
     * @returns {void}
     */
    async read()
    {
        this.fileContents = await fetch(this.filePath)
            .then(response => response.text());

        this.fileLines = this.fileContents.trim().split("\n");
    }

    /**
     * Parse the lines of the input file
     * @returns {object} Key:value pairs of parsed data
     */
    parse()
    {
        return this.parser.parse(this.fileLines);
    }
}
