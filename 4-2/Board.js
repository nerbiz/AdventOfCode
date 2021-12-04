class Board
{
    /**
     * @param {number} identifier The identifier of the board
     * @param {array} boardNumbers An array of 25 numbers
     */
    constructor(identifier, boardNumbers)
    {
        this.identifier = identifier;
        this.rows = [];
        this.columns = [];
        this.winningNumber = null;

        // Populate the rows
        for (let i = 0; i < 5; i++) {
            const start = (i * 5);
            this.rows.push(boardNumbers.slice(start, start + 5));
        }

        // Populate the columns
        for (let columnIndex = 0; columnIndex < 5; columnIndex++) {
            const column = [];
            for (let i = 0; i < 5; i++) {                
                column.push(boardNumbers[columnIndex + (i * 5)]);
            }

            this.columns.push(column);
        }
    }

    /**
     * @param {number} number The drawn number
     * @returns {boolean}
     */
    checkWin(number)
    {
        // Loop over rows and columns
        for (let i = 0; i < 5; i++) {
            const row = this.rows[i];
            const column = this.columns[i];

            // Loop over the numbers of each row and column
            for (let j = 0; j < 5; j++) {
                // Remove the number from the row, if it matches
                if (row[j] === number) {
                    row.splice(j, 1);
                }

                // Remove the number from the column, if it matches
                if (column[j] === number) {
                    column.splice(j, 1);
                }

                // A row or column has been completed
                if (row.length === 0 || column.length === 0) {
                    this.winningNumber = number;
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * @returns {number}
     */
    calculateScore()
    {
        let score = 0;
        this.rows.forEach(row => score += row.reduce((previous, current) => previous + current, 0));

        return score * this.winningNumber;
    }
}
