export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map((line, index) => {
            const [position, velocity, acceleration] = line
                .split(', ')
                .map(part => part
                    .split('=')
                    .at(1)
                    .slice(1, -1)
                    .split(',')
                    .map(number => number - 0)
                );

            return {index, position, velocity, acceleration};
        });
    }
}
