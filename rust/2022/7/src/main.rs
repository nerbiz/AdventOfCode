mod part1;
mod part2;
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
        }

        if line.starts_with("$ cd") {
            let parts: Vec<&str> = line.split(' ').collect();

            if parts[2] == ".." {
                // Add the index of the current directory to the parent directory
                let index: usize = dir_indexes.pop().unwrap();
                let parent_index: usize = *dir_indexes.last().unwrap();
                directories.get_mut(parent_index).unwrap().sub.push(index);
            } else {
                directories.push(Directory {
                    contents: Vec::new(),
                    sub: Vec::new(),
                });

                dir_indexes.push(directories.len() - 1);
            }
        } else {
            // Add the 'file' line to the contents of the current directory
            let index: usize = *dir_indexes.last().unwrap();
            directories.get_mut(index).unwrap().contents.push(line);
        }
    }

    // Add the last directories as a subdirectory of the root directory
    let root_dir: &mut Directory = directories.first_mut().unwrap();
    dir_indexes[1..].iter().for_each(|&index| root_dir.sub.push(index));

    // Replace the directories with their sizes
    let mut directories: Vec<u32> = directories.iter()
        .map(|directory| get_dir_size(&directories, &directory))
        .collect();

    println!("Part 1 answer: {}", part1::solve(&mut directories));
    println!("Part 2 answer: {}", part2::solve(&mut directories));
}

fn get_dir_size(directories: &Vec<Directory>, directory: &Directory) -> u32 {
    let contents_sum: u32 = directory.contents.iter()
        .map(|file| {
            let parts: Vec<&str> = file.split(' ').collect();
            parts[0].parse::<u32>().unwrap()
        })
        .sum();

    let sub_directories_sum: u32 = directory.sub.iter()
        .map(|&sub_index| {
            let sub_dir = directories.get(sub_index).unwrap();
            get_dir_size(directories, sub_dir)
        })
        .sum();

    contents_sum + sub_directories_sum
}
