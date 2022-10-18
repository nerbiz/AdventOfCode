export default class Console
{
    /**
     * General formatting
     * @type {string}
     */
    static RESET = '\x1b[0m';
    static BOLD = '\x1b[1m';
    static UNDERSCORE = '\x1b[4m';

    /**
     * Foreground (text) colours
     * @type {string}
     */
    static BLACK = '\x1b[30m';
    static RED = '\x1b[31m';
    static GREEN = '\x1b[32m';
    static YELLOW = '\x1b[33m';
    static BLUE = '\x1b[34m';
    static MAGENTA = '\x1b[35m';
    static CYAN = '\x1b[36m';
    static WHITE = '\x1b[37m';

    /**
     * Background colors
     * @type {string}
     */
    static BG_BLACK = '\x1b[40m';
    static BG_RED = '\x1b[41m';
    static BG_GREEN = '\x1b[42m';
    static BG_YELLOW = '\x1b[43m';
    static BG_BLUE = '\x1b[44m';
    static BG_MAGENTA = '\x1b[45m';
    static BG_CYAN = '\x1b[46m';
    static BG_WHITE = '\x1b[47m';

    /**
     * Log multiple array items, each on a new line
     * @param {array} items
     * @returns {void}
     */
    static logEach(items)
    {
        for (const item of items) {
            console.log(item);
        }
    }

    /**
     * Log values with an indent
     * @param {number} amount
     * @param values
     * @returns {void}
     */
    static indent(amount, ...values)
    {
        if (amount < 1) {
            console.log(...values);
            return;
        }

        console.log(' '.repeat(amount - 1), ...values);
    }

    /**
     * Log a value in an information block
     * @param {string} value
     * @returns {void}
     */
    static infoBlock(value)
    {
        console.log(
            '%c' + value,
            'border-radius: 4px; padding: 5px; background-color: skyblue; color: #222;'
        );
    }

    /**
     * Construct a console message with multiple properties like color
     * @param parameters
     * @returns {void}
     */
    static build(...parameters)
    {
        console.log(parameters.join('') + this.RESET);
    }
}
