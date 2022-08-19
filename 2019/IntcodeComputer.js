export default class IntcodeComputer {
    /**
     * The program to run
     * @type {array}
     */
    program = [];

    /**
     * The current input value for the program
     * @type {number}
     */
    input;

    /**
     * The relative base for relative mode
     * @type {number}
     */
    relativeBase = 0;

    /**
     * The generator producing signals
     * @type {Generator|null}
     */
    generator = null;

    /**
     * @param {array} program
     * @param {number} input The first signal for the program
     * @constructor
     */
    constructor(program, input = 1) {
        this.program = program;
        this.setInput(input);
    }

    /**
     * @param {number} input
     */
    setInput(input) {
        this.input = input;
    }

    /**
     * Get a position from the program, to get a value from
     * @param {number} mode
     * @param {number} index
     * @returns {number}
     */
    getPosition(mode, index) {
        // Immediate mode
        return (mode === 1)
            ? index
            // Position mode
            : (mode === 0)
                ? this.program[index]
                // Relative mode
                : this.program[index] + this.relativeBase;
    }

    /**
     * Get a value from the program
     * @param {number} mode
     * @param {number} index
     * @returns {number}
     */
    getValue(mode, index) {
        const position = this.getPosition(mode, index);

        return this.program[position] || 0;
    }

    /**
     * Get the mext signal from the program
     * @returns {number}
     */
    getNextSignal() {
        if (this.generator === null) {
            this.generator = this.start();
        }

        return this.generator.next().value;
    }

    /**
     * Run the program
     * @yields {number}
     * @returns {Generator}
     */
    *start() {
        let index = 0;

        while (index < this.program.length) {
            const instruction = this.program[index];
            const opcode = instruction % 100;

            // Stop at opcode 99
            if (opcode === 99) {
                break;
            }

            // Get mode and parameter values
            const mode1 = Math.floor(instruction % 1000 / 100);
            const mode2 = Math.floor(instruction % 10000 / 1000);
            const mode3 = Math.floor(instruction % 100000 / 10000);
            const parameter1 = this.getValue(mode1, index + 1);
            const parameter2 = this.getValue(mode2, index + 2);

            switch (opcode) {
                // Addition
                case 1:
                    this.program[this.getPosition(mode3, index + 3)] = parameter1 + parameter2;
                    index += 4;
                    break;
                // Multiplication
                case 2:
                    this.program[this.getPosition(mode3, index + 3)] = parameter1 * parameter2;
                    index += 4;
                    break;
                // Input
                case 3:
                    this.program[this.getPosition(mode1, index + 1)] = this.input;
                    index += 2;
                    break;
                // Output
                case 4:
                    yield parameter1;
                    index += 2;
                    break;
                // Jump if true
                case 5:
                    index = (parameter1 !== 0) ? parameter2 : index + 3;
                    break;
                // Jump if false
                case 6:
                    index = (parameter1 === 0) ? parameter2 : index + 3;
                    break;
                // Less than
                case 7:
                    this.program[this.getPosition(mode3, index + 3)] = Number(parameter1 < parameter2);
                    index += 4;
                    break;
                // Equal
                case 8:
                    this.program[this.getPosition(mode3, index + 3)] = Number(parameter1 === parameter2);
                    index += 4;
                    break;
                // Change relative base
                case 9:
                    this.relativeBase += parameter1;
                    index += 2;
                    break;
            }
        }
    }
}
