export default class
{
    /**
     * @param {string} filePath The path to the input file
     * @param {object} parser An object handling the file parsing
     * @param {boolean} trim Whether to trim the file contents
     */
    constructor(filePath, parser, trim = true)
    {
        this.filePath = filePath;
        this.parser = parser;
        this.trim = trim;
    }

    /**
     * Read and parse the input file
     * @returns {any}
     */
    async parse()
    {
        let fileContents = await fetch(this.filePath)
            .then(response => response.text());

        // Trim the file contents if needed
        if (this.trim === true) {
            fileContents = fileContents.trim();
        }

        return this.parser.parse(fileContents.split("\n"));
    }
}
