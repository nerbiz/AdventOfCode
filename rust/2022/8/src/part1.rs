pub fn solve(rows: &Vec<Vec<u32>>) -> usize {
    let mut columns: Vec<Vec<u32>> = Vec::new();
    for (y, row) in rows.iter().enumerate() {
        for (x, tree) in row.iter().enumerate() {
            match y == 0 {
                true => &columns.push(vec![*tree]),
                false => &columns[x].push(*tree),
            };
        }
    }

    let mut visible_amount: usize = 0;

    for (y, row) in rows.iter().enumerate() {
        // Trees at the edges are visible
        if y == 0 || y == rows.len() - 1 {
            visible_amount += row.len();
            continue;
        }

        'next_x: for (x, tree) in row.iter().enumerate() {
            // Trees at the edges are visible
            if x == 0 || x == row.len() - 1 {
                visible_amount += 1;
                continue;
            }

            // Get the maximum tree height of up/down/left/right directions
            let max_heights: [&u32; 4] = [
                &columns[x][..y].iter().max().unwrap(),
                &columns[x][y+1..].iter().max().unwrap(),
                &rows[y][..x].iter().max().unwrap(),
                &rows[y][x+1..].iter().max().unwrap(),
            ];

            for height in max_heights {
                if tree > height {
                    visible_amount += 1;
                    continue 'next_x;
                }
            }
        }
    }

    visible_amount
}
