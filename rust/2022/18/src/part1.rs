pub fn solve(cubes: &mut Vec<Vec<u32>>) -> u32 {
    let mut total = 0;

    for index in 0..cubes.len() {
        let (left, right) = cubes.split_at_mut(index + 1);

        let cube: &mut Vec<u32> = left.last_mut().unwrap();

        for other in right.iter_mut() {
            // If the distance is 1, it's directly connected
            let distance: u32 = cube[0].abs_diff(other[0])
                + cube[1].abs_diff(other[1])
                + cube[2].abs_diff(other[2]);

            // Reduce the exposed sides in both cubes
            if distance == 1 {
                cube[3] -= 1;
                other[3] -= 1;
            }
        }

        total += cube[3];
    }

    total
}
