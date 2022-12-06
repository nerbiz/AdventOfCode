use std::collections::HashSet;

pub fn solve(signal: &String) -> usize {
    // The amount of distinct characters required
    let amount = 14;
    let mut i: usize = 0;

    loop {
        i += 1;

        // Use a HashSet to check for unique character values
        let slice = String::from(&signal[i..i+amount]);
        let slice: HashSet<char> = HashSet::from_iter(slice.chars());

        if slice.len() == amount {
            break i + amount
        }
    }
}
