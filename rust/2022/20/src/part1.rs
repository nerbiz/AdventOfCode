use crate::{coordinates_sum, mix_list};

pub fn solve(original: &Vec<(usize, isize)>) -> isize {
    let mut edited: Vec<(usize, isize)> = original.clone();
    mix_list(original, &mut edited);

    coordinates_sum(&edited)
}
