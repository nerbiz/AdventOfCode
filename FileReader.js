export default class
{
    /**
     * @param {string} filePath The path to the input file
     * @param {object} parser An object handling the file parsing
     * @param {boolean} trim Whether to trim the file contents
     */
    constructor(filePath, parser, trim)
    {
        this.filePath = filePath;
        this.parser = parser;
        this.trim = (trim === undefined) ? true : trim;
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

        // Trim the file contents if needed
        if (this.trim) {
            this.fileContents = this.fileContents.trim();
        }

        this.fileLines = this.fileContents.split("\n");
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
