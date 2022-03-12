export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const samples = [];
        const testProgram = [];

        const parseRegisters = line => line
            .replace(']', '')
            .replace('  ', ' ')
            .split(': [')
            .at(1)
            .replaceAll(', ', '');

        const parseInstruction = line => line
            .split(' ')
            .map(number => number - 0);

        while (linesArray.length > 0) {
            const line = linesArray.shift();

            if (line === '') {
                continue;
            }

            if (line.startsWith('Before')) {
                samples.push({
                    before: parseRegisters(line),
                    instruction: parseInstruction(linesArray.shift()),
                    after: parseRegisters(linesArray.shift()),
                });
            } else {
                testProgram.push(parseInstruction(line));
            }
        }

        return {samples, testProgram};
    }
}
