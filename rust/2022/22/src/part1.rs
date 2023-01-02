const RIGHT: isize = 0;
const DOWN: isize = 1;
const LEFT: isize = 2;
const UP: isize = 3;

pub fn solve(maze: &Vec<Vec<char>>, path: &Vec<String>) -> usize {
    let start_x: usize = maze[1].iter()
        .position(|char| *char == '.')
        .unwrap();

    let mut position: [usize; 2] = [start_x, 1];
    let mut new_position: [usize; 2] = position.clone();
    let mut direction: isize = RIGHT;

    path.iter().for_each(|value| {
        new_position = position.clone();

        // Move forward
        if let Ok(amount) = value.parse::<usize>() {
            let (axis, change): (usize, isize) = match direction {
                RIGHT => (0, 1),
                DOWN => (1, 1),
                LEFT => (0, -1),
                UP | _ => (1, -1),
            };

            for _i in 0..amount {
                // Get the tile value after moving 1 step
                new_position[axis] = (new_position[axis] as isize + change) as usize;
                let mut tile: &char = maze.get(new_position[1]).unwrap()
                    .get(new_position[0]).unwrap();

                // Wrap around if moved outside the maze
                if *tile == ' ' {
                    new_position = match direction {
                        LEFT => {
                            let row = maze.get(new_position[1]).unwrap();
                            let new_x = row.iter().rposition(|char| *char != ' ').unwrap();
                            [new_x, new_position[1]]
                        },
                        RIGHT => {
                            let row = maze.get(new_position[1]).unwrap();
                            let new_x = row.iter().position(|char| *char != ' ').unwrap();
                            [new_x, new_position[1]]
                        },
                        UP => {
                            let mut row_index: usize = maze.len() - 1;
                            loop {
                                row_index -= 1;
                                if maze[row_index][new_position[0]] != ' ' {
                                    break [new_position[0], row_index]
                                }
                            }
                        },
                        DOWN | _ => {
                            let mut row_index: usize = 0;
                            loop {
                                row_index += 1;
                                if maze[row_index][new_position[0]] != ' ' {
                                    break [new_position[0], row_index]
                                }
                            }
                        },
                    };

                    tile = maze.get(new_position[1]).unwrap()
                        .get(new_position[0]).unwrap();
                }

                // Stop moving if a wall has been hit
                if *tile == '#' {
                    break;
                }

                position = new_position;
            }
        }

        // Change direction
        else {
            direction = match value.as_str() {
                "L" => (direction - 1).rem_euclid(4),
                "R" | _ => (direction + 1).rem_euclid(4),
            };
        }
    });

    1000 * position[1]
        + 4 * position[0]
        + direction as usize
}
