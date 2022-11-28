use std::fs;

pub struct Input {
    pub file_path: String,
}

impl Input {
    pub fn parse(&self) -> Vec<String> {
        let contents = fs::read_to_string(&self.file_path)
            .expect(&format!("The file '{}' needs to be readable", &self.file_path));

        contents.trim()
            .split('\n')
            .map(|line| String::from(line))
            .collect()
    }
}
