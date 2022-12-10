mod part1;
use aoc_utils::input::input_as_lines;

#[derive(Debug)]
pub struct Directory {
    contents: Vec<String>,
    sub: Vec<usize>,
}

fn main() {
    let input: Vec<String> = input_as_lines("2022/7/res/input.txt");

    let mut directories: Vec<Directory> = Vec::new();
    let mut dir_indexes: Vec<usize> = Vec::new();

    for line in input {
        // Only 'cd' and file lines are needed
        if line == "$ ls" || line.starts_with("dir") {
            continue;
        } else if line.starts_with("$ cd") {
            let parts: Vec<&str> = line.split(' ').collect();

            if parts[2] == ".." {
                let index: usize = dir_indexes.pop().unwrap();
                let parent_index: usize = *dir_indexes.last().unwrap();

                // Add the index of the current directory to the parent directory
                directories.get_mut(parent_index).unwrap()
                    .sub.push(index);
            } else {
                directories.push(Directory {
                    contents: Vec::new(),
                    sub: Vec::new(),
                });

                dir_indexes.push(directories.len() - 1);
            }
        } else {
            let index: usize = *dir_indexes.last().unwrap();

            // Add the 'file' line to the contents of the current directory
            directories.get_mut(index).unwrap()
                .contents.push(line);
        }
    }

    println!("Part 1 answer: {}", part1::solve(&directories));
}
