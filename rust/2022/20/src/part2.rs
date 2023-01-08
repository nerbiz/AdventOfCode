use crate::{coordinates_sum, mix_list};

pub fn solve(original: &mut Vec<(usize, isize)>) -> isize {
    // Multiply each value with the decryption key
    let decryption_key: isize = 811589153;
    original.iter_mut().for_each(|(_, value)| *value *= decryption_key);

    let mut edited: Vec<(usize, isize)> = original.clone();
    for _round in 0..10 {
        mix_list(original, &mut edited);
    }

    coordinates_sum(&edited)
}
