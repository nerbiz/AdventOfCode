use std::collections::HashMap;
use crate::surface_area;

pub fn solve(cubes: &Vec<[usize; 3]>, part1_answer: &usize) -> usize {
    // Determine the min/max X for each Y/Z combination
    let mut x_per_yz: HashMap<[usize; 2], [usize; 2]> = HashMap::new();
    let mut y_per_xz: HashMap<[usize; 2], [usize; 2]> = HashMap::new();
    cubes.iter().for_each(|&[x, y, z]| {
        let x_boundary: &mut [usize; 2] = x_per_yz.entry([y, z]).or_insert([usize::MAX, usize::MIN]);
        let y_boundary: &mut [usize; 2] = y_per_xz.entry([x, z]).or_insert([usize::MAX, usize::MIN]);

        x_boundary[0] = x_boundary[0].min(x);
        x_boundary[1] = x_boundary[1].max(x);
        y_boundary[0] = y_boundary[0].min(y);
        y_boundary[1] = y_boundary[1].max(y);
    });

    // x_per_yz.iter().for_each(|(yz, min_max)| {
    //     println!("{:?} {:?}", yz, min_max);
    // });

    let mut current_xy: [usize; 2] = [0, 0];
    let mut next_z: usize = 0;
    let mut air_cubes: Vec<[usize; 3]> = Vec::new();

    cubes.iter().for_each(|&[x, y, z]| {
        if current_xy != [x, y] {
            current_xy = [x, y];
            next_z = z;
            println!("\n== Current XY: {:?} ==", current_xy);
        }

        println!("Cube: {x},{y},{z}, next Z: {}", next_z);

        // There's an air cube, if the current X isn't the expected X
        if z != next_z {
            println!(">   Got Z={} instead of {}", z, next_z);

            (next_z..z).for_each(|missing_z| {
                let x_boundary = x_per_yz.get(&[y, missing_z]);
                let y_boundary = y_per_xz.get(&[x, missing_z]);
                if x_boundary == None || y_boundary == None {
                    return;
                }

                let &[min_x, max_x] = x_boundary.unwrap();
                let &[min_y, max_y] = y_boundary.unwrap();
                println!(">   X: {}..={}, Y: {}..={}", min_x, max_x, min_y, max_y);

                if x >= min_x && x <= max_x && y >= min_y && y <= max_y {
                    println!(">   Missing: {:?}", [x, y, missing_z]);
                    air_cubes.push([x, y, missing_z]);
                }
            });

            next_z = z;
            // println!(">   Next Z: {}", next_z);
            // return;
        }

        // println!("X as expected: {}", x);
        next_z += 1;
    });

    // println!("\nAir cubes:");
    // air_cubes.iter().for_each(|cube| {
    //     println!("{:?}", cube);
    // });

    println!();

    part1_answer - surface_area(&air_cubes)
}
