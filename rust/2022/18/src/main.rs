mod part1;
mod part2;

use aoc_structures::linked_list::LinkedList;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;

fn main() {
    let mut list: LinkedList<u32> = LinkedList::new();

    std::process::exit(42);


    let timing: Timing = Timing::start();

    let mut cubes: Vec<[usize; 3]> = input_as_lines("2022/18/res/input.txt", true)
        .iter()
        .map(|line| {
            let coordinates: Vec<usize> = line.split(',')
                .map(|number| number.parse().unwrap())
                .collect();

            [coordinates[0], coordinates[1], coordinates[2]]
        })
        .collect();

    cubes.sort_by(|a, b| {
        a[0].cmp(&b[0])
            .then_with(|| a[1].cmp(&b[1]))
            .then_with(|| a[2].cmp(&b[2]))
    });

    // cubes.iter().for_each(|cube| println!("{:?}", cube));

    let part1_answer: usize = part1::solve(&cubes);
    println!("Part 1 answer: {}", part1_answer);
    // 1744 is too low
    // 1936 is too low
    // 1964 is too low
    // 2092 is wrong
    // 1990 is wrong
    // 2220 is wrong
    // 2524 is wrong
    println!("Part 2 answer: {}", part2::solve(&cubes, &part1_answer));

    timing.output();
}

pub fn surface_area(cubes: &Vec<[usize; 3]>) -> usize {
    // Convert each cube to a (cube, sides) tuple
    let mut cubes: Vec<(&[usize;3], usize)> = cubes.iter()
        .map(|cube| (cube, 6))
        .collect();

    let mut total: usize = 0;

    for index in 0..cubes.len() {
        let (left, right) = cubes.split_at_mut(index + 1);

        let (cube, sides) = left.last_mut().unwrap();

        for (other, other_sides) in right.iter_mut() {
            // If the distance is 1, it's directly connected
            let distance: usize = cube[0].abs_diff(other[0])
                + cube[1].abs_diff(other[1])
                + cube[2].abs_diff(other[2]);

            // Reduce the exposed sides in both cubes
            if distance == 1 {
                *sides -= 1;
                *other_sides -= 1;
            }
        }

        total += *sides;
    }

    total
}
