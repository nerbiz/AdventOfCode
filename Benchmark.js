export default class Benchmark
{
    /**
     * Test case A
     * @type {function}
     */
    testA;

    /**
     * Test case B
     * @type {function}
     */
    testB;

    /**
     * @param {function} testA
     * @param {function} testB
     * @constructor
     */
    constructor(testA, testB)
    {
        this.testA = testA;
        this.testB = testB;
    }

    /**
     * Run the test cases
     * @param {number} times
     * @returns {void}
     */
    run(times)
    {
        console.time('Test A took');
        for (let i = 0; i < times; i++) {
            this.testA();
        }
        console.timeEnd('Test A took');

        console.time('Test B took');
        for (let i = 0; i < times; i++) {
            this.testB();
        }
        console.timeEnd('Test B took');
    }
}
