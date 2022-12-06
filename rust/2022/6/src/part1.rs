use fancy_regex::Regex;

pub fn solve(signal: &String) -> i32 {
    let regex: Regex = Regex::new(format!(
        "{}{}{}{}",
        // Any character not followed by itself
        r"(.)(?!\1)",
        // Another character not followed by previous + itself
        r"(.)(?!\1|\2)",
        // Another character not followed by previous + itself
        r"(.)(?!\1|\2|\3)",
        // Another character
        ".",
    ).as_str()).unwrap();

    if let Ok(result) = regex.find(signal) {
        if let Some(found) = result {
            return found.end() as i32;
        }
    }

    panic!("RegEx error, or sequence of 4 different characters not found");
}
