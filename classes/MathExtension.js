export default class MathExtension
{
    static registerLcm()
    {
        /**
         * Calculate the least common multiple of numbers
         * @param {Number} numbers Multiple numbers
         * @returns {Number}
         */
        Math.lcm = function(...numbers) {
            // List of prime numbers to be used for prime factorization
            const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
                53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

            // Object to store the highest power of each prime factor across all numbers
            const mostOccurrences = {};

            for (let number of numbers) {
                for (const prime of primes) {
                    // See how many times the number is divisible by this prime number
                    let occurrences = 0;
                    while (number % prime === 0) {
                        occurrences++;
                        number /= prime;
                    }

                    // Update the highest number of occurrences of the prime factor
                    mostOccurrences[prime] = Math.max(mostOccurrences[prime] || 0, occurrences);
                }

                // If there is a remainder after dividing by the prime factors, the remainder is probably a prime
                if (number > 1) {
                    mostOccurrences[number] = Math.max(mostOccurrences[number] || 0, 1);
                }
            }

            return Object.entries(mostOccurrences)
                .reduce((total, [prime, occurrences]) => total * (prime ** occurrences), 1);
        };
    }
}
