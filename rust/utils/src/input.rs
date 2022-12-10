use std::fs;

pub fn input_as_string(file_path: &str, trim: bool) -> String {
    let contents: String = fs::read_to_string(file_path)
        .expect(&format!("The file '{}' needs to be readable", file_path));

    match trim {
        true => contents.trim().to_owned(),
        false => contents,
    }
}

pub fn input_as_lines(file_path: &str) -> Vec<String> {
    input_as_string(file_path, true)
        .split('\n')
        .map(|line| line.to_owned())
        .collect()
}
