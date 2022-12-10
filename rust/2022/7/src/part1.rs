pub fn solve(dir_sizes: &mut Vec<u32>) -> u32 {
    dir_sizes.iter()
        .filter(|&size| size <= &100_000)
        .sum()
}
