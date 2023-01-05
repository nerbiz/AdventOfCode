use std::cmp::Ordering::{Equal, Greater, Less};

pub fn solve(encoded_numbers: &Vec<String>) -> String {
    let sum: i64 = encoded_numbers
        .iter()
        .map(|number| decode(number))
        .sum();

    encode(&sum)
}

fn decode(encoded: &str) -> i64 {
    encoded.chars()
        // In reverse, because the rightmost digit has index 0
        .rev()
        .enumerate()
        // Convert each encoded digit to a decimal
        .map(|(index, char)| {
            // Calculate powers 5 using the index
            let value: i64 = i64::pow(5, index as u32);

            match char {
                '2' => 2 * value,
                '1' => value,
                '0' => 0,
                '-' => -1 * value,
                '=' | _ => -2 * value,
            }
        })
        .sum()
}

fn encode(decimal_value: &i64) -> String {
    let mut encoded: String = '2'.to_string();
    let mut decoded: i64;

    // Create highest possible value out of twos (e.g. '222' == 62)
    // Stop when the value is higher than the decimal value
    loop {
        decoded = decode(&encoded);

        match decoded.cmp(decimal_value) {
            Less => encoded.push('2'),
            Equal => return encoded,
            Greater => break,
        };
    }

    encoded.chars()
        // Convert the twos string to a vector with integers
        .map(|char| char.to_string().parse().unwrap())
        .collect::<Vec<i8>>()
        .iter_mut()
        .enumerate()
        // Go from highest digit (left) to lowest (right)
        .rev()
        .map(|(index, digit)| {
            let decrease_amount: i64 = i64::pow(5, index as u32);

            // Decrease each digit, until the decoded value is too low,
            // or until the digit is at its lowest possible value
            while *digit >= -2  {
                *digit -= 1;
                decoded -= decrease_amount;

                // Too low, revert 1 decrease
                if decoded < *decimal_value {
                    *digit += 1;
                    decoded += decrease_amount;
                    break;
                }
            }

            *digit
        })
        .collect::<Vec<i8>>()
        .iter()
        .map(|number| match number {
            2 | 1 | 0 => char::from_digit(*number as u32, 10).unwrap(),
            -1 => '-',
            -2 | _ => '=',
        })
        .collect::<String>()
}
