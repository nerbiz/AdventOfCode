pub fn solve(rows: &Vec<Vec<u32>>, columns: &Vec<Vec<u32>>) -> u32 {
    let mut max_score = 0;

    for (y, row) in rows.iter().enumerate() {
        // Skip trees at the edges
        if y == 0 || y == rows.len() - 1 {
            continue;
        }

        for (x, tree) in row.iter().enumerate() {
            // Skip trees at the edges
            if x == 0 || x == row.len() - 1 {
                continue;
            }

            // Get a list of trees in all directions
            let directions: [Vec<&u32>; 4] = [
                columns[x][..y].iter().rev().collect::<Vec<&u32>>(),
                columns[x][y+1..].iter().collect::<Vec<&u32>>(),
                rows[y][..x].iter().rev().collect::<Vec<&u32>>(),
                rows[y][x+1..].iter().collect::<Vec<&u32>>(),
            ];

            let score: u32 = directions
                .iter()
                .filter_map(|others| {
                    let mut sub_score: u32 = 0;
                    for &other in others {
                        sub_score += 1;
                        if other >= tree {
                            break;
                        }
                    }

                    match sub_score > 0 {
                        true => Some(sub_score),
                        false => None,
                    }
                })
                .product();

            max_score = max_score.max(score);
        }
    }

    max_score
}
