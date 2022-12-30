mod part1;
mod part2;
use aoc_pathfinding::dijkstra::Grid;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;

fn main() {
    let input: Vec<String> = input_as_lines("2022/12/res/input.txt", true);
    let timing: Timing = Timing::start();

    let mut start: [usize; 2] = [0, 0];
    let mut target: [usize; 2] = [0, 0];

    let costs: Vec<Vec<u32>> = input.into_iter()
        .enumerate()
        .map(|(y, line)| line.chars()
            .enumerate()
            .map(|(x, character)| {
                match character {
                    'S' => {
                        start = [x, y];
                        'a' as u32
                    },
                    'E' => {
                        target = [x, y];
                        'z' as u32
                    },
                    _ => character as u32,
                }
            })
            .collect())
        .collect();

    let mut area: Grid = Grid::from(&costs);
    // Valid neighbours can only be at most 1 higher
    area.set_neighbour_condition(|&cost, &other| other <= cost + 1);

    println!("Part 1 answer: {}", part1::solve(&mut area.clone(), &start, &target));
    println!("Part 2 answer: {}", part2::solve(&mut area, &target));
    timing.output();
}
