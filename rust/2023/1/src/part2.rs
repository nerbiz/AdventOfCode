pub fn solve(calibration_values: &Vec<String>) -> u32 {
    // Separate digits and names for translation
    let digits: Vec<&str> = vec!["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let digit_names: Vec<&str> = vec![
        "one", "two", "three", "four", "five",
        "six", "seven", "eight", "nine"
    ];

    // All digit representations to check with
    let mut all_digits: Vec<&str> = digits.clone();
    all_digits.extend(digit_names.iter().cloned());

    calibration_values
        .iter()
        .map(|value| {
            // Loop over all digits, also the names of them
            let mut found_digits: Vec<(usize, &str)> = all_digits
                .iter()
                // Find all positions in the current line
                .filter_map(|digit| {
                    // Create a list of (position, digit) tuples
                    let positions: Vec<(usize, &str)> = value
                        .match_indices(*digit)
                        .collect();

                    match positions.len() > 0 {
                        true => Some(positions),
                        false => None,
                    }
                })
                // Flatten the list of position lists
                .flatten()
                // Translate names to digits if needed
                .map(|item| {
                    match item.1.parse::<u32>() {
                        Ok(_) => item,
                        Err(_) => {
                            // Find the corresponding position in the digits vector
                            let position: usize = digit_names
                                .iter()
                                .position(|name| *name == item.1)
                                .unwrap();

                            // Return the name translated to a digit
                            (item.0, *digits.get(position).unwrap())
                        }
                    }
                })
                .collect();

            // Sort the found digits by position
            found_digits.sort_by(|a, b| a.0.cmp(&b.0));

            // Connect first and last digit, then parse as number
            let (_, first_digit) = found_digits.first().unwrap();
            let (_, last_digit) = found_digits.last().unwrap();
            (first_digit.to_string() + &last_digit.to_string())
                .parse::<u32>()
                .unwrap()
        })
        .collect::<Vec<u32>>()
        .iter()
        .sum()
}
