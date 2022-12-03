use std::collections::HashSet;

pub fn solve(rucksacks: &Vec<String>) -> i32 {
    rucksacks.chunks(3)
        .map(|group| {
            let elves: Vec<HashSet<char>> = group.iter()
                .map(|elf| elf.chars().collect())
                .collect();

            elves[0].iter()
                .filter(|character|
                    elves[1].contains(character)
                    && elves[2].contains(character)
                )
                .map(|character| character.to_owned())
                .next()
                .unwrap()
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
