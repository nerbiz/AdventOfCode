mod part1;
use aoc_utils::input::input_as_lines;

fn main() {
    let input: Vec<String> = input_as_lines("2022/2/res/input.txt");
    let a_code: i32 = 'A' as i32;
    let x_code: i32 = 'X' as i32;

    let rounds: Vec<[i32; 2]> = input.into_iter()
        .map(|round| {
            let moves: Vec<char> = round.split(' ')
                .map(|letter| letter.chars().next().unwrap())
                .collect();

            [
                (moves[0] as i32) - a_code + 1,
                (moves[1] as i32) - x_code + 1,
            ]
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&rounds));
}
