mod part1;
mod part2;
use aoc_utils::input::input_as_lines;

fn main() {
    let input = input_as_lines("2022/8/res/input.txt", true);

    let rows: Vec<Vec<u32>> = input.iter()
        .map(|line| line.chars()
            .map(|number|
                number.to_digit(10).expect("All characters need to be numbers")
            )
            .collect()
        )
        .collect();

    let mut columns: Vec<Vec<u32>> = Vec::new();
    for (y, row) in rows.iter().enumerate() {
        for (x, tree) in row.iter().enumerate() {
            match y == 0 {
                true => &columns.push(vec![*tree]),
                false => &columns[x].push(*tree),
            };
        }
    }

    println!("Part 1 answer: {}", part1::solve(&rows, &columns));
    println!("Part 2 answer: {}", part2::solve(&rows, &columns));
}
