mod part1;
use aoc_utils::input::input_as_lines;

fn main() {
    let input: Vec<String> = input_as_lines("2022/14/res/input.txt", true);

    let mut min_x: usize = usize::MAX;
    let mut max_x: usize = 0;
    let mut max_y: usize = 0;

    let rocks: Vec<Vec<[usize; 2]>> = input.iter()
        .map(|line| line.split(" -> ")
            .map(|point| {
                let location: Vec<usize> = point.split(',')
                    .map(|number| number.parse().unwrap())
                    .collect();

                // Update the min/max values
                min_x = min_x.min(location[0]);
                max_x = max_x.max(location[0]);
                max_y = max_y.max(location[1]);

                // Create the path point as an array
                [location[0], location[1]]
            })
            .collect()
        )
        .collect();

    let mut cave: Vec<Vec<char>> = (0..=max_y)
        .map(|_| ".".repeat(max_x + 2).chars().collect::<Vec<char>>())
        .collect();

    rocks.iter().for_each(|locations| {
        locations.iter()
            .enumerate()
            .for_each(|(index, location)| {
                if index == 0 {
                    return;
                }

                let prev = locations[index - 1];

                if location[0] == prev[0] {
                    let from = prev[1].min(location[1]);
                    let to = prev[1].max(location[1]);

                    for y in from..=to {
                        cave[y][location[0]] = '#';
                    }
                } else {
                    let from = prev[0].min(location[0]);
                    let to = prev[0].max(location[0]);

                    for x in from..=to {
                        cave[location[1]][x] = '#';
                    }
                }
            });
    });


    println!("Part 1 answer: {}", part1::solve(&mut cave));
    show_cave(&cave, min_x);
}

pub fn show_cave(cave: &Vec<Vec<char>>, min_x: usize) {
    cave.iter().for_each(|row| {
        println!("{}", row[min_x-1..]
            .iter()
            .map(|char| char.to_string())
            .collect::<Vec<String>>()
            .join("")
        );
    });
}
