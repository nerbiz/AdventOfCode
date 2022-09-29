import IntcodeComputer from './IntcodeComputer.js';

export default class AsciiComputer
{
    /**
     * @type {IntcodeComputer}
     */
    intcodeComputer;

    /**
     * The last signal coming from the intcode computer
     * @type {number|undefined}
     */
    lastSignal;

    /**
     * @param {array} program
     * @param {...number} input The first input for the program
     * @constructor
     */
    constructor(program, ...input)
    {
        this.intcodeComputer = new IntcodeComputer(program, ...input);
        this.intcodeComputer.enableWaiting();
    }

    /**
     * Set input value(s) for the computer
     * @param {string} input
     * @returns {void}
     */
    addInput(input)
    {
        const inputs = (input.trim() + '\n')
            .split('')
            .map(character => character.charCodeAt(0));

        this.intcodeComputer.addInput(...inputs);
    }

    /**
     * Get the next output string
     * @returns {string}
     */
    getNextOutput()
    {
        let output = '';

        while (true) {
            const signal = this.intcodeComputer.getNextSignal();
            if (signal === undefined) {
                break;
            }

            output += String.fromCharCode(signal);
            this.lastSignal = signal;
        }

        return output.trim();
    }

    /**
     * @returns {number|undefined}
     */
    getLastSignal()
    {
        return this.lastSignal;
    }
}
