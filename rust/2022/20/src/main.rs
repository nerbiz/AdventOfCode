mod part1;
mod part2;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;

fn main() {
    let input: Vec<String> = input_as_lines("2022/20/res/input.txt", true);
    let timing: Timing = Timing::start();

    // Create (index, value) tuples
    let mut original: Vec<(usize, isize)> = input.iter()
        .enumerate()
        .map(|(index, line)| (index, line.parse().unwrap()))
        .collect();

    println!("Part 1 answer: {}", part1::solve(&original));
    println!("Part 2 answer: {}", part2::solve(&mut original));
    timing.output();
}

pub fn mix_list(original: &Vec<(usize, isize)>, edited: &mut Vec<(usize, isize)>) {
    for item in original.iter() {
        let current_index: usize = edited.iter()
            .position(|other| other == item)
            .unwrap();

        edited.remove(current_index);

        let insert_at: usize = (current_index as isize + item.1)
            .rem_euclid(edited.len() as isize) as usize;

        edited.insert(insert_at, item.to_owned());
    }
}

pub fn coordinates_sum(list: &Vec<(usize, isize)>) -> isize {
    // Find the index of the 0 value
    let zero_index = list.iter()
        .position(|(_, value)| *value == 0)
        .unwrap();

    // Sum the 1000th, 2000th and 3000th number that comes after 0
    (1..=3).collect::<Vec<usize>>()
        .iter()
        .map(|number| {
            let index: usize = (zero_index + (number * 1000)) % list.len();
            list[index].1
        })
        .sum()
}
