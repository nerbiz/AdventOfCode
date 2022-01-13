export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        // The empty line split the report with the aunt properties
        const emptyLineIndex = linesArray.findIndex(line => line === '');

        const analysis = {};
        linesArray.slice(0, emptyLineIndex)
            .map(line => line.split(': '))
            .forEach(report => analysis[report[0]] = parseInt(report[1], 10));

            // Sue 1: cars: 9, akitas: 3, goldfish: 0
        const auntSues = linesArray.slice(emptyLineIndex + 1)
            .map(line => line.replace(/^Sue \d+: /, ''))
            .map(line => line.split(', ')
                .map(property => property.split(': ')))
            .map((properties, index) => {
                const propertiesObject = {number: index + 1};
                for (const property of properties) {
                    propertiesObject[property[0]] = parseInt(property[1], 10);
                }
                return propertiesObject;
            });

        return {analysis, auntSues};
    }
}
