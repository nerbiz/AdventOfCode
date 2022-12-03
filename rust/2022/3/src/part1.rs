use std::collections::HashSet;

pub fn solve(rucksacks: &Vec<String>) -> i32 {
    rucksacks.into_iter()
        .map(|line| {
            let contents: (&str, &str) = line.split_at(line.len() / 2);
            [contents.0.to_string(), contents.1.to_string()]
        })
        .map(|rucksack| {
            let one: HashSet<char> = rucksack[0].chars().collect();
            let two: HashSet<char> = rucksack[1].chars().collect();
            one.intersection(&two).next().unwrap().to_owned()
        })
        .map(|character| {
            let char_code = character as i32;

            match char_code > 'Z' as i32 {
                true => char_code - 'a' as i32 + 1,
                false => char_code - 'A' as i32 + 27,
            }
        })
        .sum()
}
