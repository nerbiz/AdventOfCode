use crate::Monkey;

pub fn solve(monkeys: &mut Vec<Monkey>) -> u64 {
    // Contains inspections amount by each monkey
    let mut inspections: Vec<u64> = monkeys.iter().map(|_| 0).collect();

    // To reduce the worry level, use a modulo operation
    // This needs to be a number that is divisible by all dividers
    let modulus: u64 = monkeys.iter()
        .fold(1, |product, monkey| product * monkey.divider);

    for _round in 0..10_000 {
        for index in 0..monkeys.len() {
            // Indicates which level needs to go to which monkey
            let mut move_levels: Vec<(u64, usize)> = Vec::new();
            let monkey: &mut Monkey = monkeys.get_mut(index).unwrap();
            inspections[index] += monkey.levels.len() as u64;

            monkey.levels.drain(0..).for_each(|level| {
                // Determine the number to calculate with
                let amount: u64 = match monkey.operation[1].as_str() {
                    "old" => level,
                    _ => monkey.operation[1].parse::<u64>().unwrap(),
                };

                // Calculate the new worry level
                let level: u64 = (match monkey.operation[0].as_str() {
                    "*" => level * amount,
                    "+" | _ => level + amount,
                }) % modulus;

                // true/false translates to 1/0, used with the next indexes vector
                let is_divisible: bool = level % monkey.divider == 0;
                let next_index: usize = monkey.next[is_divisible as usize];
                move_levels.push((level, next_index));
            });

            // Move the levels to other monkey(s)
            for (level, index) in move_levels {
                monkeys.get_mut(index).unwrap().levels.push(level);
            }
        }
    }

    inspections.sort_by(|a, b| b.cmp(&a));
    inspections[..=1].iter().product()
}
