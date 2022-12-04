use std::collections::HashSet;

pub fn solve(rucksacks: &Vec<String>) -> i32 {
    rucksacks.chunks(3)
        .map(|group| {
            let elves: Vec<HashSet<char>> = group.iter()
                .map(|elf| elf.chars().collect())
                .collect();

            elves[0].iter()
                .filter(|item_type| elves[1..].iter()
                    .all(|elf| elf.contains(item_type))
                )
                .next()
                .unwrap()
                .to_owned()
        })
        .map(|item_type| {
            let char_code: i32 = item_type as i32;

            match char_code > 'Z' as i32 {
                true => char_code - 'a' as i32 + 1,
                false => char_code - 'A' as i32 + 27,
            }
        })
        .sum()
}
