use fancy_regex::Regex;

pub fn solve(signal: &String) -> i32 {
    let regex: Regex = Regex::new(r"(.)(?!\1)(.)(?!(?:\1|\2))(.)(?!(?:\1|\2|\3))(.)(?!(\1|\2|\3|\4))").unwrap();

    if let Ok(result) = regex.find(signal) {
        if let Some(found) = result {
            return found.end() as i32;
        }
    }

    panic!("RegEx error, or sequence of 4 different characters not found");
}
