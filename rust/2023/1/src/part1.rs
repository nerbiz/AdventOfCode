pub fn solve(calibration_values: &Vec<String>) -> u32 {
    calibration_values
        .iter()
        .map(|value| {
            let mut first_digit: char = '0';
            let mut last_digit: char = '0';
            let characters: Vec<char> = value.chars().collect();

            for character in &characters {
                if character.is_digit(10) {
                    first_digit = *character;
                    break;
                }
            }

            for character in characters.iter().rev() {
                if character.is_digit(10) {
                    last_digit = *character;
                    break;
                }
            }

            (first_digit.to_string() + &last_digit.to_string())
                .parse::<u32>()
                .unwrap()
        })
        .collect::<Vec<u32>>()
        .iter()
        .sum()
}
