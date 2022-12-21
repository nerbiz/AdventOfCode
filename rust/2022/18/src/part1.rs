pub fn solve(cubes: &Vec<Vec<u32>>) -> u32 {
    let mut total = 0;

    for cube in cubes.iter() {
        // Start with 6 sides, then see how many are covered
        let mut sides: u32 = 6;

        for other in cubes.iter() {
            if other == cube {
                continue;
            }

            // If the distance is 1, it's directly connected
            let distance: u32 = cube[0].abs_diff(other[0])
                + cube[1].abs_diff(other[1])
                + cube[2].abs_diff(other[2]);

            if distance == 1 {
                sides -= 1;
            }
        }

        total += sides;
    }

    total
}
