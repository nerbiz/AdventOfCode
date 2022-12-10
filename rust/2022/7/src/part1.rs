use crate::Directory;

pub fn solve(directories: &Vec<Directory>) -> u32 {
    directories.iter()
        .filter_map(|directory| {
            let size: u32 = get_dir_size(directories, &directory);
            if size <= 100_000 { Some(size) } else { None }
        })
        .sum()
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
