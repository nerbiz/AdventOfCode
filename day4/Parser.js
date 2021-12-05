export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const parsedData = {
            drawnNumbers: linesArray.shift()
                .split(',')
                .map(number => parseInt(number, 10)),
            boardsNumbers: [],
        };

        // Remove the line between drawn numbers and board numbers
        linesArray.shift();

        let boardNumbers = [];
        linesArray.map(line => line.trim())
            .forEach(line => {
                // When an empty line is reached, a board is complete
                if (line === '') {
                    parsedData.boardsNumbers.push(boardNumbers);
                    boardNumbers = [];
                    return;
                }

                const numbers = line.replace(/ {2,}/g, ' ')
                    .split(' ')
                    .map(number => parseInt(number, 10));
                
                boardNumbers = boardNumbers.concat(numbers);
            });

        return parsedData;
    }
}
