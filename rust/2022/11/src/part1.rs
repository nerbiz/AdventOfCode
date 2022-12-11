use crate::Monkey;

pub fn solve(monkeys: &mut Vec<Monkey>) -> u32 {
    // Contains inspections amount by each monkey
    let mut inspections: Vec<u32> = monkeys.iter().map(|_| 0).collect();

    for _round in 0..20 {
        for index in 0..monkeys.len() {
            // Indicates which item needs to go to which monkey
            let mut move_items: Vec<(u32, usize)> = Vec::new();
            let monkey: &mut Monkey = monkeys.get_mut(index).unwrap();
            inspections[index] += monkey.items.len() as u32;

            monkey.items.drain(0..).for_each(|item| {
                // Determine the number to calculate with
                let operand = monkey.operation[1].parse::<u32>();
                let amount: u32 = match operand.is_ok() {
                    true => operand.unwrap(),
                    false => item,
                };

                // Calculate the new worry level of the item
                let item: u32 = (match monkey.operation[0].as_str() {
                    "*" => item * amount,
                    "+" | _ => item + amount,
                }) / 3;

                // true/false translates to 1/0, used with the next indexes vector
                let is_movable: bool = item % monkey.divider == 0;
                let next_index: usize = monkey.next[is_movable as usize];
                move_items.push((item, next_index));
            });

            // Move the items to other monkey(s)
            for (item, index) in move_items {
                monkeys.get_mut(index).unwrap().items.push(item);
            }
        }
    }

    inspections.sort_by(|a, b| b.cmp(&a));
    inspections[..=1].iter().product()
}
