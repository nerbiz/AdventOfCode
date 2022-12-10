pub fn solve(dir_sizes: &mut Vec<u32>) -> u32 {
    dir_sizes.sort();

    let unused_space: u32 = 70_000_000 - dir_sizes.last().unwrap();
    let space_needed: u32 = 30_000_000 - unused_space;

    *dir_sizes.iter().find(|&size| size >= &space_needed).unwrap()
}
