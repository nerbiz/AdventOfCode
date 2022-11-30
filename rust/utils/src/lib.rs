use std::fs;

pub fn input_lines(file_path: &str) -> Vec<String> {
    let contents = fs::read_to_string(file_path)
        .expect(&format!("The file '{}' needs to be readable", file_path));

    contents.trim()
        .split('\n')
        .map(|line| String::from(line))
        .collect()
}
