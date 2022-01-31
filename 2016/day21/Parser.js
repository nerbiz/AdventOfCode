export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        return {
            password: linesArray.shift().split(' ')[1],
            operations: linesArray.map(line => {
                const parts = line.split(' ');
                const operation = [parts[0]];

                if (operation[0] === 'swap') {
                    operation[1] = parts[1];

                    if (operation[1] === 'position') {
                        operation[2] = parts[2] - 0;
                        operation[3] = parts[5] - 0;
                    } else {
                        operation[2] = parts[2];
                        operation[3] = parts[5];
                    }
                } else if (operation[0] === 'rotate') {
                    operation[1] = parts[1];

                    if (['left', 'right'].includes(operation[1])) {
                        operation[2] = parts[2] - 0;
                    } else {
                        operation[2] = parts[6];
                    }
                } else if (operation[0] === 'reverse') {
                    operation[1] = parts[2] - 0;
                    operation[2] = parts[4] - 0;
                } else if (operation[0] === 'move') {
                    operation[1] = parts[2] - 0;
                    operation[2] = parts[5] - 0;
                }

                return operation;
            }),
        };
    }
}
