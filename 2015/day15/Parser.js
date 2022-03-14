export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map(line => {
            const [name, properties] = line.split(': ');
            const ingredient = {name};

            for (const property of properties.split(', ')) {
                const [name, value] = property.split(' ');
                ingredient[name] = parseInt(value, 10);
            }

            return ingredient;
        });
    }
}
