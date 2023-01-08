pub fn solve(original: &Vec<(usize, isize)>) -> isize {
    let mut edited: Vec<(usize, isize)> = original.clone();

    for item in original.iter() {
        let current_index: usize = edited.iter()
            .position(|other| other == item)
            .unwrap();

        edited.remove(current_index);

        let insert_at: usize = (current_index as isize + item.1)
            .rem_euclid(edited.len() as isize) as usize;

        edited.insert(insert_at, item.to_owned());
    }

    // Find the index of the 0 value
    let zero_index = edited.iter()
        .position(|(_, value)| *value == 0)
        .unwrap();

    // Sum the 1000th, 2000th and 3000th number that comes after 0
    (1..=3).collect::<Vec<usize>>()
        .iter()
        .map(|number| {
            let index: usize = zero_index + (number * 1000);
            let item: (usize, isize) = edited[index.rem_euclid(edited.len())];
            item.1
        })
        .sum()
}
