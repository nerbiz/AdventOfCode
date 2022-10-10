export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const screenParts = linesArray.shift().split(' ');
        const screen = {
            rows: parseInt(screenParts[1].split('=').at(1), 10),
            columns: parseInt(screenParts[2].split('=').at(1), 10),
        };

        const instructions = linesArray.map(line => {
            const lineParts = line.split(' ');
            const type = lineParts[0];

            if (type === 'rect') {
                const [x, y] = lineParts[1].split('x');

                return {
                    type,
                    x: parseInt(x, 10),
                    y: parseInt(y, 10),
                };
            } else {
                return {
                    type,
                    part: lineParts[1],
                    index: parseInt(lineParts[2].split('=')[1], 10),
                    amount: parseInt(lineParts[4], 10),
                };
            }
        });

        return {screen, instructions};
    }
}
