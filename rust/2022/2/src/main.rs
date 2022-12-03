mod part1;
mod part2;
use aoc_utils::input::input_as_lines;

fn main() {
    let input: Vec<String> = input_as_lines("2022/2/res/input.txt");
    let a_code: i32 = 'A' as i32;
    let x_code: i32 = 'X' as i32;

    let rounds: Vec<[i32; 2]> = input.into_iter()
        .map(|round| {
            // Get the move letters as separate characters
            let moves: Vec<char> = round.split(' ')
                .map(|letter| letter.chars().next().unwrap())
                .collect();

            // Convert moves to 0-based numbers (0, 1 or 2)
            [
                (moves[0] as i32) - a_code,
                (moves[1] as i32) - x_code,
            ]
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&rounds));
    println!("Part 2 answer: {}", part2::solve(&rounds));
}
