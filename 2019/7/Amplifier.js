export default class Amplifier {
    /**
     * The highest signal produced by any amplifier
     * @type {number}
     */
    static highestSignal = 0;

    /**
     * The program to run
     * @type {array}
     */
    program;

    /**
     * The current position within the program
     * @type {number}
     */
    index = 0;

    /**
     * The inputs queue for the program
     * @type {array}
     */
    inputs = [];

    /**
     * The amplifier that gets signals from this one
     * @type {Amplifier}
     */
    pairedAmplifier;

    /**
     * Whether the end of the program is reached
     * @type {boolean}
     */
    stopped = false;

    /**
     * @param {array} program
     * @constructor
     */
    constructor(program) {
        this.program = program.map(number => number);
    }

    /**
     * Add a number to the inputs queue
     * @param {number} input
     */
    addInput(input) {
        this.inputs.push(input);
    }

    /**
     * @param {Amplifier} amplifier
     * @returns {void}
     */
    setPairedAmplifier(amplifier) {
        this.pairedAmplifier = amplifier;
    }

    /**
     * @return {boolean}
     */
    isStopped() {
        return this.stopped;
    }

    /**
     * The main program loop
     * @returns {void}
     */
    nextStep() {
        const instruction = this.program[this.index];
        const opcode = instruction % 100;

        // Stop at opcode 99
        if (opcode === 99) {
            this.stopped = true;
        }

        // Get the modes for the parameters
        const mode1 = Math.floor(instruction % 1000 / 100);
        const mode2 = Math.floor(instruction % 10000 / 1000);

        // Get the parameter values if needed
        let parameter1, parameter2;
        if (opcode !== 3 && opcode !== 4) {
            parameter1 = (mode1 === 0)
                ? this.program[this.program[++this.index]]
                : this.program[++this.index];

            parameter2 = (mode2 === 0)
                ? this.program[this.program[++this.index]]
                : this.program[++this.index];
        }

        let signal;
        switch (opcode) {
            // Addition
            case 1:
                this.program[this.program[++this.index]] = parameter1 + parameter2;
                break;
            // Multiplication
            case 2:
                this.program[this.program[++this.index]] = parameter1 * parameter2;
                break;
            // Input
            case 3:
                // Wait for an input, if the queue is empty
                if (this.inputs.length === 0) {
                    return;
                }

                this.program[this.program[++this.index]] = this.inputs.shift();
                break;
            // Output
            case 4:
                signal = (mode1 === 0)
                    ? this.program[this.program[++this.index]]
                    : this.program[++this.index];

                // Update the highest signal value if needed
                Amplifier.highestSignal = Math.max(Amplifier.highestSignal, signal);

                // Give the signal to the paired amplifier
                this.pairedAmplifier.addInput(signal);
                break;
            // Jump if true
            case 5:
                if (parameter1 !== 0) {
                    this.index = parameter2;
                    return;
                }
                break;
            // Jump if false
            case 6:
                if (parameter1 === 0) {
                    this.index = parameter2;
                    return;
                }
                break;
            // Less than
            case 7:
                this.program[this.program[++this.index]] = Number(parameter1 < parameter2);
                break;
            // Equal
            case 8:
                this.program[this.program[++this.index]] = Number(parameter1 === parameter2);
                break;
        }

        this.index++;
    }
}
