export default class IntcodeComputer
{
    /**
     * The program to run
     * @type {array}
     */
    program = [];

    /**
     * The current index (location) within the program
     * @type {number}
     */
    programIndex = 0;

    /**
     * The current input value for the program
     * @type {array}
     */
    input = [];

    /**
     * Whether the program pauses when asking for input
     * @type {boolean}
     */
    waitForInput = false;

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
     * @param {...number} input The first input for the program
     * @constructor
     */
    constructor(program, ...input)
    {
        this.program = program;

        if (input.length > 0) {
            this.setInput(...input);
        }
    }

    /**
     * Make the program wait, when asking for input
     * @returns {void}
     */
    enableWaiting() {
        this.waitForInput = true;
    }

    /**
     * @param {...number} input
     */
    setInput(...input)
    {
        this.input = input;
    }

    /**
     * @param {...number} input
     */
    addInput(...input)
    {
        this.input.push(...input);
    }

    /**
     * Get a position from the program, to get a value from
     * Mode 0 = position mode
     * Mode 1 = immediate mode
     * Mode 2 = relative mode
     * @param {number} mode
     * @param {number} index
     * @returns {number}
     */
    getPosition(mode, index)
    {
        if (mode === 1) {
            return index;
        }

        return this.program[index]
            + (mode === 2 ? this.relativeBase : 0);
    }

    /**
     * Get a value from the program
     * @param {number} mode
     * @param {number} index
     * @returns {number}
     */
    getValue(mode, index)
    {
        const position = this.getPosition(mode, index);

        return this.program[position] || 0;
    }

    /**
     * Get the mext signal from the program
     * @returns {number}
     */
    getNextSignal()
    {
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
    *start()
    {
        programLoop: while (this.programIndex < this.program.length) {
            const instruction = this.program[this.programIndex];
            const opcode = instruction % 100;

            // Stop at opcode 99
            if (opcode === 99) {
                break;
            }

            // Get mode and parameter values
            const mode1 = Math.floor(instruction % 1000 / 100);
            const mode2 = Math.floor(instruction % 10000 / 1000);
            const mode3 = Math.floor(instruction % 100000 / 10000);
            const parameter1 = this.getValue(mode1, this.programIndex + 1);
            const parameter2 = this.getValue(mode2, this.programIndex + 2);
            let targetPosition;

            switch (opcode) {
                // Addition
                case 1:
                    targetPosition = this.getPosition(mode3, this.programIndex + 3);
                    this.program[targetPosition] = parameter1 + parameter2;
                    this.programIndex += 4;
                    break;
                // Multiplication
                case 2:
                    targetPosition = this.getPosition(mode3, this.programIndex + 3);
                    this.program[targetPosition] = parameter1 * parameter2;
                    this.programIndex += 4;
                    break;
                // Input
                case 3:
                    const nextInput = this.input.shift();
                    if (this.waitForInput === true && nextInput === undefined) {
                        this.generator = null;
                        break programLoop;
                    }

                    targetPosition = this.getPosition(mode1, this.programIndex + 1);
                    this.program[targetPosition] = nextInput;
                    this.programIndex += 2;
                    break;
                // Output
                case 4:
                    yield parameter1;
                    this.programIndex += 2;
                    break;
                // Jump if true (non-zero)
                case 5:
                    this.programIndex = (parameter1 !== 0)
                        ? parameter2
                        : this.programIndex + 3;
                    break;
                // Jump if false (zero)
                case 6:
                    this.programIndex = (parameter1 === 0)
                        ? parameter2
                        : this.programIndex + 3;
                    break;
                // Less than
                case 7:
                    targetPosition = this.getPosition(mode3, this.programIndex + 3);
                    this.program[targetPosition] = Number(parameter1 < parameter2);
                    this.programIndex += 4;
                    break;
                // Equal
                case 8:
                    targetPosition = this.getPosition(mode3, this.programIndex + 3);
                    this.program[targetPosition] = Number(parameter1 === parameter2);
                    this.programIndex += 4;
                    break;
                // Change relative base
                case 9:
                    this.relativeBase += parameter1;
                    this.programIndex += 2;
                    break;
            }
        }
    }
}
