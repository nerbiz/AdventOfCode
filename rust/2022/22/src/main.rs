mod part1;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;
use regex::Regex;

fn main() {
    let input: Vec<String> = input_as_lines("2022/22/res/input.txt", false);
    let timing: Timing = Timing::start();

    let mut max_line_length: usize = 0;
    let maze: Vec<String> = input.iter()
        .take_while(|line| !line.is_empty())
        .map(|line| {
            // Add a space before and after each maze line, used for wrap-around checking
            let line: String = " ".to_owned() + line + " ";
            // Update the highest row length value
            max_line_length = max_line_length.max(line.len());
            line
        })
        .collect();

    let mut maze: Vec<Vec<char>> = maze.iter()
        .map(|line| {
            // Add extra spaces, to make each line equal length
            let extra_spaces: String = " ".repeat(max_line_length - line.len());
            (line.to_owned() + &extra_spaces).chars().collect()
        })
        .collect();

    // Insert rows with spaces, for wrap-around checking
    let mut first = maze.first().unwrap().clone();
    let mut last = maze.last().unwrap().clone();
    first.fill(' ');
    last.fill(' ');
    maze.insert(0, first);
    maze.push(last);

    // Convert the path string to steps
    let path_regex: Regex = Regex::new(r"\d+|[RL]").unwrap();
    let path: &String = input.get(input.len() - 2).unwrap();
    let path: Vec<String> = path_regex.captures_iter(path)
        .map(|capture| capture[0].to_owned())
        .collect();

    println!("Part 1 answer: {}", part1::solve(&maze, &path));
    timing.output();
}
