use std::collections::HashMap;
use grid::Grid;

pub fn solve(grove: &mut Grid<char>) -> usize {
    // Collect elves into a list of [y, x] indexes
    let mut elves: Vec<[usize; 2]> = Vec::new();
    for y in 0..grove.rows() {
        grove.iter_row(y)
            .enumerate()
            .for_each(|(x, char)| {
                if *char == '#' {
                    elves.push([y, x]);
                }
            });
    }

    // Create arrays of delta Y/X for surrounding positions
    let surrounding: [[isize; 2]; 8] = [
        [-1, -1], [-1, 0], [-1, 1], [0, 1],
        [1, 1], [1, 0], [1, -1], [0, -1],
    ];

    // Create arrays of indexes for N/S/W/E directions
    let side_indexes: [[usize; 3]; 4] = [
        [0, 1, 2],
        [6, 5, 4],
        [0, 7, 6],
        [2, 3, 4],
    ];

    // The first side to check, changes each round
    let mut first_side_index: usize = 0;

    for _round in 0..10 {
        // Contains new positions, with indexes of elves proposing to move there
        let mut moving_elves: HashMap<[usize; 2], Vec<usize>> = HashMap::new();

        // Changes to false, if any elf has neighbour(s)
        let mut all_separated: bool = true;

        for elf_index in 0..elves.len() {
            let [elf_y, elf_x]: &[usize; 2] = elves.get(elf_index).unwrap();
            let mut has_neighbours = false;

            // : Vec<char>
            let neighbours: Vec<char> = surrounding
                .map(|[delta_y, delta_x]| {
                    let y: usize = (*elf_y as isize + delta_y) as usize;
                    let x: usize = (*elf_x as isize + delta_x) as usize;

                    if let Some(neighbour) = grove.get(y, x) {
                        if *neighbour == '#' {
                            has_neighbours = true;
                            all_separated = false;
                        }

                        return *neighbour
                    }

                    '.'
                })
                .to_vec();

            // Don't move if there are no neighbours
            if ! has_neighbours {
                continue;
            }

            // Look in all directions
            'directions: for direction_index in first_side_index..first_side_index+4 {
                let side_indexes: &[usize; 3] = side_indexes.get(direction_index % 4).unwrap();

                for neighbour_index in side_indexes.iter() {
                    // Look in the next direction, if there is a neighbour
                    if neighbours[*neighbour_index] == '#' {
                        continue 'directions;
                    }
                }

                // Determine the new position, which is the middle (index 1) of a side
                let [delta_y, delta_x]: &[isize; 2] = surrounding.get(side_indexes[1]).unwrap();
                let move_to: [usize; 2] = [
                    (*elf_y as isize + *delta_y) as usize,
                    (*elf_x as isize + *delta_x) as usize,
                ];

                // Add the proposed position to the collection
                moving_elves.entry(move_to).or_insert(Vec::new());
                moving_elves.get_mut(&move_to).unwrap().push(elf_index);

                break;
            }
        }

        // Stop if all elves are separated (not moving any more)
        if all_separated {
            break;
        }

        for (move_to, elf_indexes) in moving_elves {
            // Skip if more than one elf wants to move to the same position
            if elf_indexes.len() > 1 {
                continue;
            }

            let elf_index: &usize = elf_indexes.first().unwrap();
            let elf: &mut [usize; 2] = elves.get_mut(*elf_index).unwrap();

            // Update the grove
            grove[elf[0]][elf[1]] = '.';
            grove[move_to[0]][move_to[1]] = '#';

            // Update the elf
            elf[0] = move_to[0];
            elf[1] = move_to[1];
        }

        // Change the first direction for the next round
        first_side_index = (first_side_index + 1) % 4;
    }

    let [min_y, max_y, min_x, max_x]: [usize; 4] = elves.iter().fold(
        [usize::MAX, usize::MIN, usize::MAX, usize::MIN],
        |current, elf| [
            current[0].min(elf[1]),
            current[1].max(elf[1]),
            current[2].min(elf[0]),
            current[3].max(elf[0]),
        ]
    );

    let x_size: usize = max_x - min_x + 1;
    let y_size: usize = max_y - min_y + 1;
    (x_size * y_size) - elves.len()
}
