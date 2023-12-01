use crate::rock::Rock;

pub fn solve(tower: &mut Vec<u16>, directions: &Vec<i8>, rocks: &Vec<Rock>) -> usize {
    // Infinite iterators over directions and rocks
    let mut direction_iter = directions.iter().cycle();
    let mut rock_iter = rocks.iter().cycle();

    // println!("Total directions: {}", directions.len());

    // An empty tower row, for adding and checking
    let empty_row: u16 = (1 << 8) + 1;

    let mut rock_count: usize = 0;
    while rock_count < 2022 {
        // Get the next rock to fall
        let mut rock: Rock = rock_iter.next().unwrap().clone();

        // Make rows to check collision with (starting as empty)
        let mut compare_rows: Vec<u16> = vec![empty_row]
            .repeat(rock.rows().len());

        // Appearing and falling 3 units uses 4 directions
        for _i in 0..4 {
            let direction: &i8 = direction_iter.next().unwrap();
            rock.move_sideways(direction, &compare_rows);
        }

        // Determine at which tower row (index) the rock will rest
        let mut land_at_index: usize = 0;
        'try_fall: for tower_index in (0..tower.len()).rev() {
            for (index, row) in rock.rows().iter().enumerate() {
                if let Some(tower_row) = tower.get(tower_index + index) {
                    // If the rock collides below, place the rock on top
                    if row & tower_row > 0 {
                        land_at_index = tower_index + 1;
                        break 'try_fall;
                    }
                }
            }

            // Get the part of the tower to check collision with
            compare_rows = (0..rock.rows().len())
                .map(|index| {
                    match tower.get(tower_index + index) {
                        Some(tower_row) => *tower_row,
                        None => empty_row,
                    }
                })
                .collect();

            // The rock can fall 1 unit, (try to) move sideways
            let direction: &i8 = direction_iter.next().unwrap();
            rock.move_sideways(direction, &compare_rows);
        }

        for (index, row) in rock.rows().iter().enumerate() {
            // Either 'join' the rock row in an existing row, or create a new row
            match tower.get_mut(land_at_index + index) {
                Some(tower_row) => *tower_row += row,
                None => tower.push(empty_row + row),
            };
        }

        rock_count += 1;
    }

    // Don't include the floor in the count
    tower.len() - 1
}
