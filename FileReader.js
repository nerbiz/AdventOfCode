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
    parse()
    {
        return fetch(this.filePath)
            .then(response => response.text())
            // Trim the file contents if needed
            .then(text => this.trim ? text.trim() : text)
            // Parse the contents of the response
            .then(text => this.parser.parse(text.split("\n")));
    }
}
